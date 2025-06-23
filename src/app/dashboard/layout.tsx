import React, { Suspense } from "react";
import { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "PR Ninja Dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <Suspense fallback={<Loading />}>
        <AppSidebar />
        <main className="w-full relative">
          <SidebarTrigger className="sticky top-10" />
          {children}
        </main>
      </Suspense>
    </SidebarProvider>
  );
}
