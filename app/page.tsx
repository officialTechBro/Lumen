import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
      </main>
    </>
  );
}
