import { API_URL } from "@/config";
import { cookies } from "next/headers";

export async function fetchOrders() {
  try {
    const token = cookies().get("token")?.value;

    const res = await fetch(`${API_URL}/orders`, {
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
