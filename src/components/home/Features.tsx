import React from "react";
import { BarChart3, Github, Users, Zap } from "lucide-react";
import Card from "../Card";

const featuresArray = [
  {
    icon: Zap,
    title: "AI-Powered PR Suggestions",
    description:
      "Get intelligent code review suggestions powered by advanced AI to improve code quality and reduce review time.",
    gradient: "bg-blue-400/20 dark:bg-white/20",
  },
  {
    icon: BarChart3,
    title: "Code Quality Insights",
    description:
      "Deep analytics on code quality, maintainability scores, and technical debt tracking across your repositories.",
    gradient: "bg-blue-400/20 dark:bg-white/20",
  },
  {
    icon: Github,
    title: "GitHub App Integration",
    description:
      "Seamless integration with GitHub. Install once and get automated reviews on every pull request.",
    gradient: "bg-blue-400/20 dark:bg-white/20",
  },
  {
    icon: Users,
    title: "Team Analytics",
    description:
      "Track team performance, review velocity, and collaboration patterns to optimize your development workflow.",
    gradient: "bg-blue-400/20 dark:bg-white/20",
  },
];

const Features = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12">
      <h2 className="text-5xl font-bold">Features</h2>
      <p className="text-2xl">
        Powerful features designed to make code reviews faster, smarter, and
        more effective.
      </p>
      <div className="w-full flex justify-evenly flex-wrap gap-2.5">
        {featuresArray.map((item, idx) => (
          <Card key={idx} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Features;
