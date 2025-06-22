import React from "react";
import { BarChart3, Github, Users, Zap } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { CardDataType } from "@/types/home";

const featuresArray:CardDataType[] = [
  {
    icon: Zap,
    title: "AI-Powered PR Suggestions",
    description:
      "Get intelligent code review suggestions powered by advanced AI to improve code quality and reduce review time.",
    gradient: "from-blue-500 to-indigo-600",
    background: "from-blue-500/50 to-indigo-600/50",
  },
  {
    icon: BarChart3,
    title: "Code Quality Insights",
    description:
      "Deep analytics on code quality, maintainability scores, and technical debt tracking across your repositories.",
    gradient: "from-violet-500 to-purple-600",
    background: "from-violet-500/50 to-purple-600/50",
  },
  {
    icon: Github,
    title: "GitHub App Integration",
    description:
      "Seamless integration with GitHub. Install once and get automated reviews on every pull request.",
    gradient: "from-emerald-500 to-teal-600",
    background: "from-emerald-500/50 to-teal-600/50",
  },
  {
    icon: Users,
    title: "Team Analytics",
    description:
      "Track team performance, review velocity, and collaboration patterns to optimize your development workflow.",
    gradient: "from-pink-500 to-fuchsia-600",
    background: "from-pink-500/50 to-fuchsia-600/50",
  },
];

const Features = () => {
  return (
    <div
      id="feature-section"
      className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12"
    >
      <div className="w-full text-center mb-10">
        <h2 className="text-5xl font-bold mb-5">Features</h2>
        <p className="text-2xl">
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
