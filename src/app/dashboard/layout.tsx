import React from "react";
import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "PR Ninja Dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <main className="w-full relative">
        <SidebarTrigger className="sticky top-10" />
        {children}
      </main>
    </SidebarProvider>
  );
}
