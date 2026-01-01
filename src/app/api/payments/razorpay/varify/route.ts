import crypto from "crypto";

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
  .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
  .update(body)
  .digest("hex");

if (expectedSignature !== razorpay_signature) {
  return error;
}
