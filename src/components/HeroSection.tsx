import React from "react";
import { Button } from "@/components/ui/button";
import ThemeToggleButton from "./ThemeToggleButton";

const HeroSection = () => {
  return (
    <div className="h-[100vh] flex flex-col items-center justify-center gap-5 relative">
      <img className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl w-full h-full z-[-1]" src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1750355233/65b8f370a600366bc7cf9bdb_unlock-the-power-of-website-analytics-bg-image-techflow-x-webflow-template-Photoroom_tun8bw.png" alt="Background image" />
      <h1 className="text-7xl font-bold text-center">Code Reviews,<br />Powered by AI.</h1>
      <h2 className="text-center font-medium">
        Instantly review your GitHub pull requests for bugs, <br />improvements, and
        security risks. Save time, <br />ship safer code.
      </h2>
      <div className="flex gap-3">
        <Button variant="outline">Get Started Free</Button>
        <Button variant="outline">View Demo</Button>
      </div>
    </div>
  );
};

export default HeroSection;
