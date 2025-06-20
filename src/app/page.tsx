import Features from "@/components/home/Features";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <HowItWorks />
      <Features />
      <Pricing />
    </div>
  );
}
