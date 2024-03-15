"use client";

import { InitialState, loginHandler } from "@/app/api/auth/actions";
import Link from "next/link";
import React from "react";
import { useFormState } from "react-dom";

const LoginPage = () => {
  const initialState = { message: "" };
  const [state, formAction] = useFormState<InitialState, FormData>(
    loginHandler,
    initialState
  );

  return (
    <>
      <div>
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            action={formAction}
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
                required
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="**********"
                name="password"
                required
              />
            </div>
            {state.message && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{state.message}</strong>
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="/auth/forgotPassword"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 Learn Turkish. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
