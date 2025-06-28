import React from "react";
import { BarChart3, Github, Users, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { CardDataType } from "@/types/home";

const featuresArray: CardDataType[] = [
  {
    icon: Zap,
    title: "AI-Powered PR Suggestions",
    description:
      "Get intelligent code review suggestions powered by advanced AI to improve code quality and reduce review time.",
    gradient: "from-orange-500 to-amber-600",
    background: "from-orange-500/50 to-amber-600/50",
  },
  {
    icon: BarChart3,
    title: "Code Quality Insights",
    description:
      "Deep analytics on code quality, maintainability scores, and technical debt tracking across your repositories.",
    gradient: "from-cyan-500 to-sky-600",
    background: "from-cyan-500/50 to-sky-600/50",
  },
  {
    icon: Github,
    title: "GitHub App Integration",
    description:
      "Seamless integration with GitHub. Install once and get automated / manual reviews on every pull request.",
    gradient: "from-lime-500 to-green-600",
    background: "from-lime-500/50 to-green-600/50",
  },
  {
    icon: Users,
    title: "Team Analytics",
    description:
      "Track team performance, review velocity, and collaboration patterns to optimize your development workflow.",
    gradient: "from-rose-500 to-red-600",
    background: "from-rose-500/50 to-red-600/50",
  },
];


const Features = () => {
  return (
    <div
      id="feature-section"
      className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10  px-5 sm:px-12 my-16"
    >
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">Features</h2>
        <p className="text-base sm:text-2xl">
          Powerful features designed to make code reviews faster, smarter, and
          more effective.
        </p>
      </div>
      <div className="w-full flex justify-evenly flex-wrap gap-2.5">
        {featuresArray.map((item, idx) => (
          <FeatureCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Features;
