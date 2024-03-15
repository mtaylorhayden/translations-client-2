"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const tokenId = searchParams.get("tokenId");
  console.log(userId, tokenId);

  return (
    <div>
      <h2>Reset Password Form</h2>
    </div>
  );
};

export default ResetPasswordForm;
