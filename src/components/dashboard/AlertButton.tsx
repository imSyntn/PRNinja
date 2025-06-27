import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import axios from "axios";
import type { UserResource } from "@clerk/types";
import { toast } from "sonner";

const defaultText = "Delete";
const defaultDescription =
  "This action cannot be undone. This will permanently delete your account and remove your data from our servers.";

const AlertButton = ({
  text = defaultText,
  description = defaultDescription,
  data,
}: {
  text?: string;
  description?: string;
  data: UserResource;
}) => {
  const handleDelete = async () => {
    try {
      const res = await axios.delete("/api/user/delete", {
        data: {
          userId: data.id,
        },
      });

      if (res.status === 200) {
        toast("Account deleted successfully.");
        return;
      } else {
        toast("Error occured.");
      }
    } catch (error) {
      toast("Error occured.");
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="text-red-400 hover:text-red-500 ml-4 cursor-pointer"
          size="sm"
        >
          {text}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="outline"
              className="text-red-400 hover:text-red-500 ml-4 cursor-pointer"
              size="sm"
              onClick={handleDelete}
            >
              {text}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertButton;
