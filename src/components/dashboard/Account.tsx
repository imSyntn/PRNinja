import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Image from "next/image";
import AlertButton from "./AlertButton";
import { Badge } from "../ui/badge";
import type { UserResource } from "@clerk/types";
import axios from "axios";
import { toast } from "sonner";

const Account = ({
  basicData,
}: {
  basicData: UserResource;
}) => {
  const handleDeleteUser = async () => {
    try {
      const res = await axios.delete("/api/user", {
        data: {
          userId: basicData.id,
        },
      });

      if (res.status === 200) {
        toast("Account deleted successfully.");
        // router.push('/get-started');
        return;
      } else {
        toast("Error occured.");
      }
    } catch (error) {
      toast("Error occured.");
      console.log(error);
      return;
    }
  };

  return (
    <div id="account" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">Account</h2>
      <h3 className="text-xl font-semibold my-4 ml-3">Profile</h3>
      <div className="flex items-center gap-10 flex-wrap ml-6">
        <Image
          src={
            basicData.imageUrl ||
            "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
          }
          width={122}
          height={122}
          alt="Profile pic"
          className="rounded-full"
        />
        <div className="flex flex-col justify-between">
          <Label htmlFor="email" className="my-2">
            Name:
          </Label>
          <div className="flex w-full max-w-sm items-center gap-3">
            <Input
              type="text"
              disabled
              placeholder={basicData.fullName || "Add name."}
            />
            {/* <Button type="submit" variant="outline" className="cursor-pointer">
              Change
            </Button> */}
          </div>
          <Label htmlFor="email" className="my-2">
            Email
          </Label>
          <Input
            type="email"
            disabled
            id="email"
            placeholder={basicData.emailAddresses[0].emailAddress || ""}
            className="max-w-sm"
          />
        </div>
      </div>

      {/*  */}

      <h3 className="text-xl font-semibold mt-9 mb-4 ml-3">Billing</h3>
      <p className="ml-6 mb-2">
        {/* Plan:{" "} */}
        <Badge
          variant="secondary"
          className="bg-gradient-to-r from-teal-400 to-yellow-200 text-black font-bold"
        >
          {/* {userData.plan} */}
          Free for all.
        </Badge>
      </p>
      {/* {userData.plan === "Free" && (
        <Button className="ml-6 cursor-pointer bg-gradient-to-r from-teal-400 to-yellow-200 text-black animated-button ">
          Upgrade to PRO 🚀
        </Button>
      )} */}

      {/*  */}

      <h3 className="text-xl font-semibold mt-9 mb-4 ml-3">Danger Zone</h3>
      <div className="flex items-center">
        <p className="ml-6 mb-2">Delete My Account</p>
        <AlertButton onClick={handleDeleteUser} />
      </div>
    </div>
  );
};

export default Account;
