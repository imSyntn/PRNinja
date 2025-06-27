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

const Dashboard = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [userData, setUserData] = useState<UserDataType | null>(null)
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/get-started");
    } else {
      const email = user.emailAddresses[0].emailAddress;

      axios.get("/api/user/get", { params: { email } }).then(e=> {
        if(e.status === 200) {
          setUserData(e.data)
        }
      }).catch((e) => toast("Error occurred."))
    }
  }, [isSignedIn, router]);

  if (!isLoaded || !user || !userData) {
    return <Loading />;
  }

  return (
    <div className="w-full px-10">
      <h1 className="text-4xl">
        Welcome <span className="animated-text mr-1">{user?.firstName}</span>!
      </h1>
      <ReviewPreference currentReviewPreference={userData.reviewPreference} />
      <Separator />
      <Integrations />
      <Separator />
      <Reviews />
      <Separator />
      <Account basicData={user} userData={userData} />
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
