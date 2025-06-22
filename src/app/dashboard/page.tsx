"use client";

import Account from "@/components/dashboard/Account";
import Integrations from "@/components/dashboard/Integrations";
import Reviews from "@/components/dashboard/Reviews";
import { CircleCheckBig, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data } = useSession();
  console.log(data);
  return (
    <div className="w-full px-10">
      <h1 className="text-4xl">
        Welcome <span className="animated-text mr-1">User</span>!
      </h1>
      <Reviews />
      <div className="w-full border border-gray-300 dark:border-gray-600" />
      <Integrations />
      <div className="w-full border border-gray-300 dark:border-gray-600" />
      <Account />
      {/* <div className="w-full border border-gray-300 dark:border-gray-600" /> */}
      <footer className="flex justify-center mt-5 mb-2.5">
        <Minus color="#3d9900" />
        <CircleCheckBig color="#3d9900" />
        <Minus color="#3d9900" />
      </footer>
    </div>
  );
};

export default Dashboard;
