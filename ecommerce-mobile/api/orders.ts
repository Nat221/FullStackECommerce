import { useAuth } from "@/store/authStore";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function createOrder(items: any[]) {
  const token = useAuth.getState().token;
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify({ order: {}, items }),
  });

  const data = await res.json();

  console.log("Data", items);

  if (!res.ok) {
    console.log(data);
    throw new Error("Error");
  }

  return data;
}
