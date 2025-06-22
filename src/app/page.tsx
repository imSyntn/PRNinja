import Faq from "@/components/home/Faq";
import Features from "@/components/home/Features";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import Pricing from "@/components/home/Pricing";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Pricing />
      <Faq />
      <Footer />
    </>
  );
}
