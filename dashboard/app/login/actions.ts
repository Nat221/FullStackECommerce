"use server";

import { login, signup } from "@/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(email: string, password: string) {
  let redirectUrl = `/login?errorMessage=${encodeURIComponent(
    "Failed to login"
  )}`;
  try {
    const res = await login(email, password);
    console.log(res);
    if (res.token) {
      cookies().set("token", res.token);
      redirectUrl = "/dashboard";
    }
  } catch (error) {
    console.log(error);
  } finally {
    redirect(redirectUrl);
  }
}

export async function handleSignup(email: string, password: string) {
  let redirectUrl = `/login?errorMessage=${encodeURIComponent(
    "Failed to sign up"
  )}`;
  try {
    console.log("SERVER SIGN UP ATTEMPT");
    const res = await signup(email, password);
    console.log("SERVER SIGN UP ATTEMPT");
    console.log(res);
    if (res.token) {
      cookies().set("token", res.token);
      redirectUrl = "/dashboard";
    }
  } catch (error) {
    console.log(error);
  } finally {
    redirect(redirectUrl);
  }
}
