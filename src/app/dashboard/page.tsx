"use client";

import { useEffect } from "react";
import Account from "@/components/dashboard/Account";
import Integrations from "@/components/dashboard/Integrations";
import ReviewPreference from "@/components/dashboard/ReviewPreference";
import Reviews from "@/components/dashboard/Reviews";
import { CircleCheckBig, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import Loading from "../loading";

const Dashboard = () => {
  const { data, status } = useSession();
  console.log(data);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/get-started");
    }
  }, [status]);

  if(!data?.user) {
    return <Loading />;
  }

  return (
    <div className="w-full px-10">
      <h1 className="text-4xl">
        Welcome <span className="animated-text mr-1">{data.user.name}</span>!
      </h1>
      <ReviewPreference />
      <Separator />
      <Integrations />
      <Separator />
      <Reviews />
      <Separator />
      <Account data={data} />
      {/* <div className="w-full border border-gray-300 dark:border-gray-600" /> */}
      <footer className="flex justify-center mt-5 mb-2.5">
        <Minus color="#3d9900" />
        <CircleCheckBig color="#3d9900" />
        <Minus color="#3d9900" />
      </footer>
    </div>
  );
};

const Separator = () => (
  <div className="w-full border border-gray-300 dark:border-gray-600" />
);

export default Dashboard;
