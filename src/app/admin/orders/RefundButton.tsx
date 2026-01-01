"use client";

export default function RefundButton({
  orderId,
}: {
  orderId: string;
}) {
  async function handleRefund() {
    const ok = confirm("Refund this order?");
    if (!ok) return;

    const res = await fetch(
      `/api/admin/orders/${orderId}/refund`,
      { method: "POST" }
    );

    if (!res.ok) {
      alert("Refund failed");
      return;
    }

    window.location.reload();
  }

  return (
    <button
      onClick={handleRefund}
      className="text-xs px-3 py-1 border border-red-400 text-red-600 rounded-soft hover:bg-red-50"
    >
      Refund
    </button>
  );
}
