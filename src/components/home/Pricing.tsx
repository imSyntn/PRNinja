import React from "react";
import { PricingPlanType } from "@/types/home";
import { CheckCircle } from "lucide-react";
import { Button } from "../ui/button";

const pricingPlans: PricingPlanType[] = [
  {
    id: "free",
    name: "Free",
    price: "0",
    description: "Perfect for individual developers",
    features: [
      "GitHub integration",
      "Up to 5 repositories",
      "Supports all languages",
      "AI-powered code analysis",
    ],
    cta: "Get Started Free",
  },
  {
    id: "pro",
    name: "Pro",
    price: "499",
    currency: "INR",
    description: "Best for growing teams",
    features: [
      "Unlimited PR reviews",
      "Priority AI processing",
      "Custom rules engine",
      "Advanced security checks",
      "Team management",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "custom", // Custom quote
    description: "For large organizations",
    features: [
      "Unlimited PR reviews",
      "On-premise deployment",
      "Custom AI model fine-tuning",
      "Enterprise-grade security",
      "Dedicated support",
      "Priority onboarding & support",
    ],
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  return (
    <div
      id="pricing-section"
      className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12"
    >
      <div className="w-full text-center mb-10">
        <h2 className="text-5xl font-bold mb-5">Simple, transparent pricing</h2>
        <p className="text-2xl">
          Choose the plan that fits your team size and needs.
        </p>
      </div>
      <div className="w-full flex justify-evenly flex-wrap gap-2.5 gap-y-9">
        {pricingPlans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;

const PricingCard = ({ plan }: { plan: PricingPlanType }) => {
  return (
    <div
      className={`relative ${
        plan.popular
          ? "border-2 border-indigo-500 shadow-xl scale-105"
          : "border border-gray-200 hover:shadow-lg"
      } rounded-lg p-5 w-80 transition-all duration-300`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-2xl px-3 py-1">
          Most Popular
        </div>
      )}
      <div className="text-center pb-2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-300">
          {plan.name}
        </h2>
        <div className="mt-4">
          <span className="text-4xl font-bold text-gray-900 dark:text-neutral-300">
            {plan.price ? plan.price : "Custom"}
          </span>
          {plan.price !== null && (
            <span className="text-gray-600 dark:text-neutral-300">/month</span>
          )}
        </div>
        <p className="text-gray-600 mt-2 dark:text-neutral-300">
          {plan.description}
        </p>
      </div>
      <div>
        <ul className="space-y-3 my-5">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
              <span className="text-gray-700 dark:text-neutral-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Button
          className={`w-full py-3 rounded-xl font-semibold mt-5 cursor-pointer ${
            plan.popular
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white"
              : "bg-gray-100 hover:bg-gray-200 text-gray-900"
          }`}
        >
          {plan.price === null ? "Contact Sales" : "Get Started"}
        </Button>
      </div>
    </div>
  );
};
