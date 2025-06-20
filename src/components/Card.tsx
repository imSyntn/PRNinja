import { cn } from "@/app/lib/utils";
import { CardDataType } from "@/types/app";
import React from "react";

const Card = ({ item }: { item: CardDataType }) => {
  const { title, description, icon: Icon, gradient, background } = item;
  return (
    <div className="group relative w-80 h-96 hover:scale-105 overflow-hidden rounded-4xl  transition-all">
      <div
        className={cn(
          "absolute top-0 -right-5 w-28 h-28 rounded-full opacity-50 group-hover:scale-150 transition-all bg-gradient-to-r ",
          gradient
        )}
      ></div>
      <div
        className={cn(
          "w-full h-full flex flex-col items-center justify-center p-5 rounded-4xl backdrop-blur-md bg-gradient-to-r ",
          background
        )}
      >
        <div
          className={cn(
            "bg-gradient-to-r",
            gradient,
            "p-2.5 rounded-3xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all"
          )}
        >
          <Icon size={40} />
        </div>
        <h3 className="text-2xl text-center mb-5">{title}</h3>
        <p className="text-lg text-center mb-5">{description}</p>
      </div>
    </div>
  );
};

export default Card;
