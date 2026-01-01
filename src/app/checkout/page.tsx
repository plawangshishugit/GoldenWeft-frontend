"use client";

import { useEffect, useState, useRef } from "react";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import {
  getCart,
  clearCart,
  CartItem,
  lockCart,
  isCartLocked,
} from "@/lib/cart";
import Link from "next/link";

/* ---------- Constants ---------- */
const ORDER_REF_KEY = "gw_last_order_ref";
const CART_SNAPSHOT_KEY = "gw_last_cart";

/* ---------- Razorpay Loader ---------- */
function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ---------- Helpers ---------- */
function generateOrderRef() {
  const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `GW-ORD-${rand}`;
}

function buildWhatsAppMessage(
  ref: string,
  name: string,
  cart: CartItem[]
) {
  const items = cart
    .map((i, idx) => `${idx + 1}. ${i.name} × ${i.quantity}`)
    .join("\n");

  return encodeURIComponent(`
Hello GoldenWeft,

I have completed payment.

Order Reference: ${ref}
Name: ${name}

Items:
${items}

Please confirm the order.
`);
}

/* ---------- Page ---------- */
export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [customerName, setCustomerName] = useState("");

  // Stable order reference (never regenerates)
  const orderRefRef = useRef<string>("");

  /* ---------- Init ---------- */
  useEffect(() => {
    const cartData = getCart();
    setCart(cartData);

    // Restore after refresh
    if (isCartLocked()) {
      const savedRef = localStorage.getItem(ORDER_REF_KEY);
      const savedCart = localStorage.getItem(CART_SNAPSHOT_KEY);

      if (savedRef && savedCart) {
        setOrderRef(savedRef);
        setSubmitted(true);
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* ---------- Submit ---------- */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const contact = formData.get("contact") as string;
    const notes = formData.get("notes") as string;

    setCustomerName(name);

    // Generate order reference ONCE
    if (!orderRefRef.current) {
      orderRefRef.current = generateOrderRef();
    }
    const ref = orderRefRef.current;

    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    /* 1️⃣ Create Razorpay order */
    const paymentRes = await fetch("/api/payments/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const paymentData = await paymentRes.json();
    if (!paymentRes.ok) {
      alert(paymentData.error || "Payment initialization failed");
      return;
    }

    /* 2️⃣ Razorpay Checkout */
    const options = {
      key: paymentData.key,
      amount: paymentData.amount,
      currency: "INR",
      name: "GoldenWeft",
      description: "Silk Order Payment",
      order_id: paymentData.orderId,

      notes: {
        orderReference: ref,
      },

      handler: async function (response: any) {
        /* 3️⃣ Verify Payment */
        const verifyRes = await fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderReference: ref,
          }),
        });

        if (!verifyRes.ok) {
          alert("Payment verification failed.");
          return;
        }

        /* 4️⃣ Save order */
        await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            reference: ref,
            name,
            contact,
            notes,
            cart,
          }),
        });

        /* 5️⃣ Persist success state */
        localStorage.setItem(ORDER_REF_KEY, ref);
        localStorage.setItem(
          CART_SNAPSHOT_KEY,
          JSON.stringify(cart)
        );

        setOrderRef(ref);
        setSubmitted(true);

        clearCart();
        lockCart();
      },

      modal: {
        ondismiss: function () {
          alert("Payment cancelled. You can retry.");
        },
      },

      prefill: {
        name,
        contact,
      },

      theme: {
        color: "#000000",
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      alert("Payment failed: " + response.error.description);
    });

    rzp.open();
  }

  /* ---------- Empty Cart ---------- */
  if (cart.length === 0 && !submitted && !isCartLocked()) {
    return (
      <Section>
        <Text as="h1">Checkout</Text>
        <Text className="mt-6">Your cart is empty.</Text>
        <Link href="/collections" className="mt-6 inline-block underline text-sm">
          Continue shopping
        </Link>
      </Section>
    );
  }

  /* ---------- Success ---------- */
  if (submitted) {
    const whatsappMessage = buildWhatsAppMessage(
      orderRef,
      customerName,
      cart
    );

    return (
      <Section>
        <div className="max-w-xl">
          <Text as="h1">Order Confirmed</Text>

          <div className="mt-6 border border-black/10 rounded-soft p-6">
            <Text className="text-sm opacity-70">Order Reference</Text>
            <Text as="h2" className="mt-2">{orderRef}</Text>
          </div>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 px-6 py-3 border border-black rounded-soft"
          >
            Continue on WhatsApp
          </a>

          <Link href="/" className="block mt-6 underline text-sm">
            Back to home
          </Link>
        </div>
      </Section>
    );
  }

  /* ---------- Form ---------- */
  return (
    <Section>
      <div className="max-w-2xl">
        <Text as="h1">Checkout</Text>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            name="name"
            required
            placeholder="Full name"
            className="w-full border p-3 rounded-soft"
          />

          <input
            name="contact"
            required
            placeholder="Email or phone"
            className="w-full border p-3 rounded-soft"
          />

          <textarea
            name="notes"
            placeholder="Delivery notes (optional)"
            className="w-full border p-3 rounded-soft h-28"
          />

          <div className="border p-4 rounded-soft">
            <Text className="text-sm opacity-70">Order Summary</Text>
            <ul className="mt-3 text-sm">
              {cart.map((item) => (
                <li key={item.productId}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
            <Text className="mt-4 font-medium">Total: ₹{total}</Text>
          </div>

          <button className="px-6 py-3 bg-black text-white rounded-soft">
            Pay & Place Order
          </button>
        </form>
      </div>
    </Section>
  );
}
