"use client"

import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {};

const Logout = (props: Props) => {
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
