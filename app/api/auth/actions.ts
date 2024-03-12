"use server";

import { InitialState } from "@/app/auth/login/page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Error {
  message: string;
  error: string;
  statusCode: number;
}

export default async function handleSubmit(
  prevState: InitialState,
  e: FormData
): Promise<InitialState> {
  const username = e.get("username");
  const password = e.get("password");

  const response = await fetch("http://localhost:8080/auth/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
    // cache: "no-store",
  });

  if (!response.ok) {
    const data: Error = await response.json();
    console.log(data.message);

    console.log("Invalid username or password login page");
    return { message: data.message };
  }

  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const jwtToken = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({ name: "jwt", value: jwtToken, secure: true, path: "/" });
  }

  redirect("/");
}
