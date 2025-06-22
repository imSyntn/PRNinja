import React from "react";
import { FaqQuesType } from "@/types/home";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqArray: FaqQuesType[] = [
  {
    question: "How does the AI code review work?",
    answer:
      "Our AI analyzes your pull requests using advanced machine learning models trained on millions of code samples. It identifies potential bugs, security vulnerabilities, performance issues, and suggests improvements in real-time.",
  },
  {
    question: "Is my code data secure?",
    answer:
      "Absolutely. We use enterprise-grade encryption and never store your code permanently. All analysis happens in secure, isolated environments, and we're SOC 2 compliant with strict data protection policies.",
  },
  {
    question: "How easy is it to integrate with GitHub?",
    answer:
      "Integration takes less than 2 minutes. Simply install our GitHub App, grant the necessary permissions, and our AI will start reviewing your pull requests automatically. No configuration required.",
  },
  {
    question: "Can I customize the AI review rules?",
    answer:
      "Yes! Pro and Enterprise plans allow you to create custom rules, adjust sensitivity levels, and configure specific checks based on your team's coding standards and requirements.",
  },
  {
    question: "What programming languages are supported?",
    answer:
      "We support 20+ programming languages including JavaScript, Python, Java, C++, Go, Rust, TypeScript, and more. Our AI is continuously learning and we add new language support regularly.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes! Our Free plan includes up to 10 PR reviews per month with no time limit. Pro plan users get a 14-day free trial with full access to all features.",
  },
];

const Faq = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10 px-12">
      <div className="w-full text-center">
        <h2 className="text-5xl font-bold mb-5">Frequently asked questions</h2>
        <p className="text-2xl">
          Everything you need to know about our platform.
        </p>
      </div>
      <div className="w-full flex justify-evenly p-12">
        <Accordion type="single" collapsible className="w-full">
          {faqArray.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p className="text-base">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
