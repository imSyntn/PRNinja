"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { useRouter } from "next/navigation";

const Page = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12">
      <SignInButton mode="modal">
        <RainbowButton>Login / Signup with Clerk</RainbowButton>
      </SignInButton>
    </div>
  );
};

export default Page;
