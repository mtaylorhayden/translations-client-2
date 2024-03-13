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

  console.log("register ", response.headers.get("Set-Cookie"));

  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const jwtToken = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({ name: "jwt", value: jwtToken, secure: true, path: "/" });
  }

  redirect("/");
}
