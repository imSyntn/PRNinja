import React from "react";
import { Github, GitPullRequestArrow, Zap } from "lucide-react";
import { CardDataType } from "@/types/app";
import Card from "../Card";

const howItWorksSteps: CardDataType[] = [
  {
    icon: Github,
    title: "Connect your GitHub",
    description: "Authorize PRNinja in one click. No setup hassles.",
    gradient: "from-blue-500 to-indigo-600",
    background: "from-blue-500/20 to-indigo-600/20",
  },
  {
    icon: GitPullRequestArrow,
    title: "Submit your PR",
    description: "Create a pull request — PRNinja automatically reviews it.",
    gradient: "from-violet-500 to-purple-600",
    background: "from-violet-500/20 to-purple-600/20",
  },
  {
    icon: Zap,
    title: "Get instant feedback",
    description:
      "AI review comments for your PR — clear and actionable.",
    gradient: "from-emerald-500 to-teal-600",
    background: "from-emerald-500/20 to-teal-600/20",
  },
];
const HowItWorks = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12">
      <h2 className="text-5xl font-bold">How it works</h2>
      <p className="text-2xl">Get started with AI-powered code reviews in three simple steps.</p>
      <div className="w-full flex justify-evenly flex-wrap gap-2.5">
        {howItWorksSteps.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
