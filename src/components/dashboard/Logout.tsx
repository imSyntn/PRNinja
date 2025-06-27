"use client";

import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { ArrowLeft } from "lucide-react";
import { SignOutButton, useUser } from "@clerk/nextjs";


const Logout = () => {
  const { isLoaded } = useUser();
  if (!isLoaded) return null;
  return (
    <SidebarMenuItem className="my-1">
      <SidebarMenuButton asChild className="text-base">
        <SignOutButton>
          <button>
            <ArrowLeft />
            <span>Sign out</span>
          </button>
        </SignOutButton>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default Logout;
