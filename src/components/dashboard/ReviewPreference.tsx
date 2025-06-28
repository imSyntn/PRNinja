"use client";

import { useState, useRef } from "react";
import { Switch } from "../ui/switch";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function ReviewPreference({
  currentReviewPreference,
  email,
}: {
  currentReviewPreference: string;
  email: string;
}) {
  const [reviewPreference, setReviewPreference] = useState<string>(
    currentReviewPreference || "auto"
  );
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const handleUpdate = () => {
    toast("Updating review preference.");
    axios
      .put("/api/user", { email, updates: { reviewPreference } })
      .then((e) => {
        if(btnRef.current) {
          btnRef.current.style.display = "none";
        }
        toast("Updated successfully.");
      })
      .catch((e) => {
        console.log(e);
        toast("Error occured..");
      });
  };

  const debouncedFunc = useDebounce(handleUpdate, 500);

  return (
    <div className="flex flex-col gap-6 my-10">
      <h2 className="text-2xl font-bold">Review preference</h2>
      <div className="flex items-center gap-3">
        <Switch
          id="terms"
          className="cursor-pointer"
          checked={reviewPreference === "auto"}
          onCheckedChange={() => setReviewPreference("auto")}
        />
        <div className="grid gap-2">
          <Label htmlFor="review-preference"> Auto Review</Label>
          <p className="text-muted-foreground text-sm">
            AI review runs automatically when a PR is opened or updated
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Switch
          id="terms-2"
          className="cursor-pointer"
          checked={reviewPreference === "manual"}
          onCheckedChange={() => setReviewPreference("manual")}
        />
        <div className="grid gap-2">
          <Label htmlFor="review-preference">Manual Review</Label>
          <p className="text-muted-foreground text-sm">
            AI reviews only when{" "}
            <span className="text-blue-500 font-semibold">@PR_Ninja</span> is
            mentioned in a PR comment
          </p>
        </div>
      </div>
      {currentReviewPreference !== reviewPreference && (
        <div className="flex justify-end">
          <Button onClick={debouncedFunc} ref={btnRef} className="cursor-pointer">Save</Button>
        </div>
      )}
    </div>
  );
}
