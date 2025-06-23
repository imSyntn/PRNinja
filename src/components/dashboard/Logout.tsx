"use client";

import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Logout = () => {
  const { status } = useSession();
  if (status !== "authenticated") {
    return null;
  }
  return (
    <SidebarMenuItem className="my-1">
      <SidebarMenuButton asChild className="text-base">
        <button onClick={() => signOut({ callbackUrl: "/" })}>
          <ArrowLeft />
          <span>Sign out</span>
        </button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default Logout;
