"use client";

import { GitPullRequest, User, Workflow } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";
import ThemeToggleButton from "../ThemeToggleButton";
import { useUser } from "@clerk/nextjs";
import Loading from "@/app/loading";
import { Caveat } from "next/font/google";


const items = [
  {
    title: "Integrations",
    url: "#integrations",
    icon: Workflow,
  },
  {
    title: "PR Reviews",
    url: "#pr-reviews",
    icon: GitPullRequest,
  },
  {
    title: "Account",
    url: "#account",
    icon: User,
  },
];

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export function AppSidebar() {

  const {isLoaded, user} = useUser()

  if(!isLoaded) {
    return <Loading />
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center mt-4 ml-2 mb-4">
        <img
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1751140356/PR_Ninja_1_vmyh2o.png"
          width={50}
          height={50}
          alt="Logo"
        />
        <h1 className={`${caveat.className} text-3xl font-extrabold tracking-wider`}>PR Ninja</h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-base mb-2">
            Options
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="my-1">
                  <SidebarMenuButton asChild className="text-base">
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem className="my-1">
                <SidebarMenuButton asChild className="text-base">
                  <ThemeToggleButton
                    size="default"
                    text="Theme"
                    className="flex justify-start font-normal !px-2"
                  />
                </SidebarMenuButton>
              </SidebarMenuItem>
              <Logout />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="my-4 ml-2 flex flex-row items-center gap-4">
        <Image
          src={
            user?.imageUrl || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          }
          width={32}
          height={32}
          alt="Profile pic"
          className="rounded-full"
        />
        <h2>{user?.fullName}</h2>
      </SidebarFooter>
    </Sidebar>
  );
}
