import { prisma } from "@/lib/prisma";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import OrderStatusSelect from "./OrderStatusSelect";
import RefundButton from "./RefundButton";


/* ---------- Status Badge ---------- */
function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PAID: "bg-green-100 text-green-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ---------- Page (SERVER) ---------- */
export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <Section>
      <Text as="h1">Customer Orders</Text>

      {orders.length === 0 ? (
        <Text className="mt-6 text-sm opacity-70">
          No orders yet.
        </Text>
      ) : (
        <div className="mt-8 space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-black/10 rounded-soft p-6"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <Text className="font-medium">
                    {order.reference}
                  </Text>

                  <Text className="text-sm opacity-70">
                    {order.name} · {order.contact}
                  </Text>

                  {/* Status */}
                  <div className="mt-3 flex items-center gap-3">
                    <StatusBadge status={order.status} />

                    <OrderStatusSelect
                      orderId={order.id}
                      initialStatus={order.status}
                    />

                    {order.status === "PAID" && (
                      <RefundButton orderId={order.id} />
                    )}
                  </div>
                </div>

                <Text className="text-xs opacity-60">
                  {new Date(order.createdAt).toLocaleString()}
                </Text>
              </div>

              {/* Items */}
              <div className="mt-4">
                <Text className="text-sm font-medium">Items</Text>
                <ul className="mt-2 list-disc list-inside text-sm opacity-80">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.name} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes */}
              {order.notes && (
                <div className="mt-4">
                  <Text className="text-sm font-medium">Notes</Text>
                  <Text className="mt-1 text-sm opacity-80">
                    {order.notes}
                  </Text>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
