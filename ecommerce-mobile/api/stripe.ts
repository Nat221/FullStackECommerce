import { useAuth } from "@/store/authStore";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://192.168.129.3:3000";

export async function fetchStripeKeys() {
  const res = await fetch(`${API_URL}/stripe/keys`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error");
  }
  return data;
}

export async function createPaymentIntent({ orderId }: { orderId: string }) {
  console.log("Payment Intent data started");
  const token = useAuth.getState().token;
  console.log("Token", token);
  const res = await fetch(`${API_URL}/stripe/payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ orderId }),
  });

  console.log(res);

  const data = await res.json();
  console.log("Payment Intent data", data);
  if (!res.ok) {
    throw new Error("Error creating payment intent");
  }
  return data;
}
