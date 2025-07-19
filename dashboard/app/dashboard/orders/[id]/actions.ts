"use server";

import { API_URL } from "@/config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateOrderStatus(id: number, status: string) {
  const redirectUrl = `/dashboard/orders/${id}`;
  const token = cookies().get("token")?.value;

  try {
    const response = await fetch(`${API_URL}/orders/${id}`, {
      method: "PUT",
      headers: {
        Authorization: token ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update order status");
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  } finally {
    redirect(redirectUrl);
  }
}
