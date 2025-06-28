import React from "react";
import {
  Github,
  GitPullRequestArrow,
  MessageSquareCode,
  Zap,
} from "lucide-react";
import { CardDataType } from "@/types/home";
import FeatureCard from "./FeatureCard";

const howItWorksSteps: CardDataType[] = [
  {
    icon: Github,
    title: "Connect your GitHub",
    description: "Authorize PRNinja in one click. No setup hassles.",
    gradient: "from-cyan-500 to-sky-600",
    background: "from-cyan-500/50 to-sky-600/50",
  },
  {
    icon: GitPullRequestArrow,
    title: "Create your PR",
    description: "Create a pull request — PRNinja automatically reviews it.",
    gradient: "from-orange-500 to-amber-600",
    background: "from-orange-500/50 to-amber-600/50",
  },
  {
    icon: MessageSquareCode,
    title: "Make a PR comment",
    description:
      "Another way is to make a pull request comment — PRNinja automatically reviews it.",
    gradient: "from-orange-500 to-pink-600",
    background: "from-orange-500/50 to-pink-600/50",
  },
  {
    icon: Zap,
    title: "Get instant feedback",
    description:
      "AI instantly reviews your PR and leaves clear, actionable comments.",
    gradient: "from-emerald-500 to-teal-600",
    background: "from-emerald-500/50 to-teal-600/50",
  },
];

const HowItWorks = () => {
  return (
    <div
      id="how-it-works"
      className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-5 sm:px-12"
    >
      <div className="w-full text-center mb-10">
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">How it works</h2>
        <p className="text-base sm:text-2xl">
          Get started with AI-powered code reviews in three simple steps.
        </p>
      </div>

      <div className="w-full flex justify-evenly flex-wrap gap-2.5">
        {howItWorksSteps.map((item, idx) => (
          <FeatureCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
