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

export function AppSidebar() {

  const {isLoaded, isSignedIn, user} = useUser()

  if(!isLoaded) {
    return <Loading />
  }

  return (
    <Sidebar>
      <SidebarHeader className="mt-4 ml-2 mb-4">
        <h1 className="text-xl font-extrabold tracking-wider">PR Ninja</h1>
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
