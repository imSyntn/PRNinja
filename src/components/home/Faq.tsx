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
      question: "Is it completely free?",
      answer:
        "Absolutely — it's 100% free! You can use all our core features without any charges.",
    },
    {
      question: "How easy is it to integrate with GitHub?",
      answer:
        "Integration takes less than 2 minutes. Simply install our GitHub App, grant the necessary permissions, and our AI will start reviewing your pull requests automatically. No configuration required.",
    },
    {
      question: "What programming languages are supported?",
      answer:
        "We support 20+ programming languages including JavaScript, Python, Java, C++, Go, Rust, TypeScript, and more. Our AI is continuously learning and we add new language support regularly.",
    },
    {
      question: "How does the AI code review work?",
      answer:
        "Our AI analyzes your pull requests using advanced machine learning models trained on millions of code samples. It identifies potential bugs, security vulnerabilities, performance issues, and suggests improvements in real-time.",
    },
    {
      question: "Does the AI leave comments directly on my pull requests?",
      answer:
        "Yes! The AI reviews your pull requests and leaves clear, contextual comments directly on your code, just like a human reviewer would — making it easy for you to spot and address issues.",
    },
    {
      question: "Will the AI review slow down my CI/CD pipeline?",
      answer:
        "Not at all. Our AI runs in parallel with your existing workflows and provides instant feedback without delaying your CI/CD processes.",
    },
    {
      question: "Can I turn off AI reviews for certain repositories?",
      answer:
        "Yes — you can easily manage which repositories are connected to the AI reviewer via your dashboard. Enable or disable reviews for individual repositories anytime.",
    },
    {
      question: "Can I customize the AI review rules?",
      answer:
        "This feature will be available soon! Currently working on allowing users to customize AI review rules based on their coding standards and preferences.",
    },
    {
      question: "Do you support self-hosted GitHub (GitHub Enterprise Server)?",
      answer:
        "Support for GitHub Enterprise Server is on our roadmap and will be available soon. Stay tuned!",
    },
];

const Faq = () => {
  return (
    <div className="min-h-[100vh] w-full flex flex-col justify-center items-center gap-10  px-5 sm:px-12 my-10">
      <div className="w-full text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">Frequently asked questions</h2>
        <p className="text-base sm:text-2xl">
          Everything you need to know about our platform.
        </p>
      </div>
      <div className="w-full flex justify-evenly px-5 sm:px-12">
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
