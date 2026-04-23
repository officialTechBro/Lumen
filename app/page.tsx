import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SampleReport } from "@/components/home/SampleReport";
import { Features } from "@/components/home/Features";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <SampleReport />
        <Features />
      </main>
    </>
  );
}
