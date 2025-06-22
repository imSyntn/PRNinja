import { cn } from "@/app/lib/utils";
import { CardDataType } from "@/types/home";
import React from "react";

const FeatureCard = ({ item }: { item: CardDataType }) => {
  const { title, description, icon: Icon, gradient, background } = item;
  return (
    <div
      className={cn(
        "group w-80 h-96 hover:scale-105 transition-all mx-auto max-w-md rounded-4xl p-0.5 shadow-lg overflow-hidden bg-gradient-to-tr",
        background
      )}
    >
      <div className="relative bg-white dark:bg-[#0a0a0a] w-full h-full rounded-4xl overflow-hidden">
        {/* gradient blob */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 z-[1] opacity-30 group-hover:h-[90%] group-hover:w-[90%] group-hover:opacity-50 group-hover:rounded-4xl transition-all bg-gradient-to-tr",
            background
          )}
        />

        {/* glassmorphism container */}
        <div className="w-full h-full p-7 rounded-4xl flex flex-col items-center justify-center backdrop-blur-xl relative z-[2]">
          {/* icon */}
          <div
            className={cn(
              "bg-gradient-to-r",
              gradient,
              "p-2.5 rounded-3xl w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all"
            )}
          >
            <Icon size={40} color="white" />
          </div>

          {/* content */}
          <h3 className="text-2xl text-center mb-5">{title}</h3>
          <p className="text-lg text-center mb-5">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
