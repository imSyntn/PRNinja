"use client";

import { useEffect, useState } from "react";
import Account from "@/components/dashboard/Account";
import Integrations from "@/components/dashboard/Integrations";
import ReviewPreference from "@/components/dashboard/ReviewPreference";
import Reviews from "@/components/dashboard/Reviews";
import { CircleCheckBig, Minus } from "lucide-react";
import React from "react";
import Loading from "../loading";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserDataType } from "@/types/dashboard";
import { toast } from "sonner";
import { TailwindGradiwntButton } from "@/components/ui/button";

const Separator = () => (
  <div className="w-full border border-gray-300 dark:border-gray-600" />
);

const Dashboard = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/get-started");
    } else {
      console.log(user);
      const email = user.emailAddresses[0].emailAddress;

      axios
        .get("/api/user", { params: { email } })
        .then((e) => {
          if (e.status === 200) {
            setUserData(e.data);
          }
        })
        .catch((e) => toast("Error occurred."));
    }
  }, [isSignedIn, router]);

  if (!isLoaded || !user || !userData) {
    return <Loading />;
  }

  if (userData.installationId === 0) {
    return (
      <div className="w-[100vw] h-[100vh] bg-black/90 fixed top-0 left-0 z-50 flex items-center justify-center">
        <TailwindGradiwntButton
          text="🚀 Install PR Ninja"
          href="https://github.com/apps/pr-ninja"
          className="cursor-pointer"
          as="a"
        />
      </div>
    );
  }

  return (
    <div className="w-full px-10">
      <h1 className="text-4xl">
        Welcome <span className="animated-text mr-1">{user?.firstName}</span>!
      </h1>
      <ReviewPreference
        currentReviewPreference={userData.reviewPreference}
        email={user.emailAddresses[0].emailAddress}
      />
      <Separator />
      {/* <Integrations userData={userData} /> */}
      <Separator />
      {/* <Reviews id={userData.id} /> */}
      <Separator />
      <Account basicData={user} userData={userData} />
      <footer className="flex justify-center mt-10 mb-2.5">
        <Minus color="#3d9900" />
        <CircleCheckBig color="#3d9900" />
        <Minus color="#3d9900" />
      </footer>
    </div>
  );
};

export default Dashboard;
