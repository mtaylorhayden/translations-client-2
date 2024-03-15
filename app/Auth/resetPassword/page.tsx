"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const tokenId = searchParams.get("tokenId");
  console.log(userId, tokenId);

  const onSubmitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const token = formData.get("tokenId");
    const userId = formData.get("userId");
    const password = formData.get("password");

    const response = await fetch("http://localhost:8080/auth/passwordReset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token, userId, password }),
    });

    // if email doesn't exist this should show the error
    if (!response.ok) {
      const data: Error = await response.json();
      return { message: data.message };
    }
    return { message: "Email sent" };
  };

  return (
    <div>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmitHandler}
        >
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
              name="password"
              required
            />
          </div>
          <input value={tokenId || ""} name="tokenId" hidden readOnly />
          <input value={userId || ""} name="userId" hidden readOnly />
          <div className="mb-6">
            {message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{message}</strong>
              </div>
            )}
          </div>
          <div className="mb-6 flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
