"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface Error {
  message: string;
  error: string;
  statusCode: number;
}

export type InitialState = {
  message: string;
};

export async function loginHandler(
  prevState: InitialState,
  e: FormData
): Promise<InitialState> {
  console.log("login ", e);

  const username = e.get("username");
  const password = e.get("password");

  const response = await fetch("http://localhost:8080/auth/signIn", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const data: Error = await response.json();
    return { message: data.message };
  }

  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const jwtToken = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({ name: "jwt", value: jwtToken, secure: true, path: "/" });
  }

  redirect("/");
}

export async function registerHandler(
  prevState: InitialState,
  e: FormData
): Promise<InitialState> {
  const username = e.get("username");
  const password = e.get("password");
  const firstName = e.get("firstName");
  const lastName = e.get("lastName");
  const email = e.get("email");

  const response = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, firstName, lastName, email }),
  });

  if (!response.ok) {
    const data: Error = await response.json();
    return { message: data.message };
  }

  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const jwtToken = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({ name: "jwt", value: jwtToken, secure: true, path: "/" });
  }

  redirect("/");
}

export async function forgotPasswordHandler(
  prevState: InitialState,
  e: FormData
) {
  console.log("inside forgotpasswordhandler");

  const email = e.get("email");

  const response = await fetch("http://localhost:8080/auth/forgotPassword", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email }),
  });

  // if email doesn't exist this should show the error
  if (!response.ok) {
    const data: Error = await response.json();
    return { message: data.message };
  }
  return { message: "Email sent" };
}
