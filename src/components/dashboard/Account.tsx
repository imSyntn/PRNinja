import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Image from "next/image";
import AlertButton from "./AlertButton";
import { Badge } from "../ui/badge";
import { Session } from "next-auth";

const Account = ({ data }: { data: Session }) => {

  return (
    <div id="account" className="my-10 h-full">
      <h2 className="text-2xl font-bold mb-5">Account</h2>
      <h3 className="text-xl font-semibold my-4 ml-3">Profile</h3>
      <div className="flex gap-10 flex-wrap ml-6">
        <div className="">
          <Image
            src={
              data.user.image ||
              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
            }
            width={100}
            height={100}
            alt="Profile pic"
            className="rounded-full mb-2.5"
          />
          <Button className="cursor-pointer">Change Pic</Button>
        </div>
        <div className="flex flex-col justify-between">
          <Label htmlFor="email" className="my-2">
            Name:
          </Label>
          <div className="flex w-full max-w-sm items-center gap-3">
            <Input type="text" placeholder={data.user.name || "Add name."} />
            <Button type="submit" variant="outline" className="cursor-pointer">
              Change
            </Button>
          </div>
          <Label htmlFor="email" className="my-2">
            Email
          </Label>
          <Input
            type="email"
            disabled
            id="email"
            placeholder={data.user.email || ""}
            className="max-w-sm"
          />
        </div>
      </div>

      {/*  */}

      <h3 className="text-xl font-semibold mt-9 mb-4 ml-3">Billing</h3>
      <p className="ml-6 mb-2">
        Plan:{" "}
        <Badge
          variant="secondary"
          className="bg-[#FFBF26] text-black font-bold"
        >
          Free
        </Badge>
      </p>
      <Button className="ml-6 cursor-pointer bg-gradient-to-r from-teal-400 to-yellow-200 text-black animated-button ">
        Upgrade to PRO 🚀
      </Button>

      {/*  */}

      <h3 className="text-xl font-semibold mt-9 mb-4 ml-3">Danger Zone</h3>
      <div className="flex items-center">
        <p className="ml-6 mb-2">Delete My Account</p>
        <AlertButton />
      </div>
    </div>
  );
};

export default Account;
