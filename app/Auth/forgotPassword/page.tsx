"use client";

import { InitialState, forgotPasswordHandler } from "@/app/api/auth/actions";
import React from "react";
import { useFormState } from "react-dom";

const forgotPassword = () => {
  const initialState = { message: "" };
  const [state, formAction] = useFormState<InitialState, FormData>(
    forgotPasswordHandler,
    initialState
  );

  return (
    <div>
      <div className="w-full max-w-xs">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          action={formAction}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              required
            />
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
                Send email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default forgotPassword;
