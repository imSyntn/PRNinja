"use client";

import React from "react";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { Github } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12">
      {session ? (
        <RainbowButton onClick={() => signOut()}>Logout</RainbowButton>
      ) : (
        <RainbowButton
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
        >
          <Github />
          Login / Signup with Github
        </RainbowButton>
      )}
    </div>
  );
};

export default page;
