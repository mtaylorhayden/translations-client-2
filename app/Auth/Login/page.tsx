import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const LoginPage = () => {
  // should we move this out to an api folder?
  async function handleSubmit(e: FormData) {
    "use server";

    // const formData = new FormData(e.get);
    const username = e.get("username");
    const password = e.get("password");

    // after this call we should be able to see a cookie in the storage of my browser
    const response = await fetch("http://localhost:8080/auth/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    console.log("response in cookie ", response.headers.get("Set-Cookie"));

    const setCookieHeader = response.headers.get("Set-Cookie");
    if (setCookieHeader) {
      const jwtToken = setCookieHeader.split(";")[0].split("=")[1];
      console.log("JWT Token:", jwtToken);
      cookies().set({ name: "jwt", value: jwtToken, secure: true, path: "/" });
    }

    // if (!response.ok) doesn't work investigate
    if (!response.ok) {
      console.log("Invalid username or password login page");
      // how can we display an error here without state?
      return;
    }

    // redirect to homepage on success
    redirect("/");
  }
  return (
    <>
      <div>
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                name="username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                name="password"
              />
              <p className="text-red-500 text-xs italic">
                Please choose a password.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
