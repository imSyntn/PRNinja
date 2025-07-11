import React from "react";
import { Button, TailwindGradiwntButton } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="px-5 h-[100vh] flex flex-col items-center justify-center gap-10 relative">
      <img
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl w-full h-full z-[-1] dark:opacity-50"
        src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1750355233/65b8f370a600366bc7cf9bdb_unlock-the-power-of-website-analytics-bg-image-techflow-x-webflow-template-Photoroom_tun8bw.png"
        alt="Background image"
      />

      <TailwindGradiwntButton
        text="🚀 Now available on GitHub Apps"
        href="https://github.com/apps/pr-ninja"
        className="cursor-default"
      />
      <h1 className="text-4xl sm:text-7xl font-bold text-center">
        Code <span className="animated-text">Reviews,</span>
        <br />
        Powered by AI.
      </h1>
      <h2 className="text-center font-medium text-base sm:text-lg w-[280px] sm:w-[510px]">
        Instantly review your GitHub pull requests for bugs, improvements, and security risks. Save time, ship safer code.
      </h2>
      <div className="flex gap-3">
        <Button variant="outline" className="cursor-pointer" asChild>
          <Link href="/get-started">Get Started</Link>
        </Button>
        <Button variant="outline" className="cursor-pointer">
          View Demo
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
