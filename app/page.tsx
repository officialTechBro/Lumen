import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        <Hero />
      </main>
    </>
  );
}
