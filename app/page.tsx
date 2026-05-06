import { auth } from "@/auth";
import { Navigation } from "@/components/home/Navigation";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { SampleReport } from "@/components/home/SampleReport";
import { Features } from "@/components/home/Features";
import { TrustCallout } from "@/components/home/TrustCallout";
import { Testimonials } from "@/components/home/Testimonials";
import { Pricing } from "@/components/home/Pricing";
import { FAQ } from "@/components/home/FAQ";
import { CTABand } from "@/components/home/CTABand";
import { Footer } from "@/components/home/Footer";

export default async function Home() {
  const session = await auth();
  const isSignedIn = !!session?.user;

  return (
    <>
      <Navigation isSignedIn={isSignedIn} />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <SampleReport />
        <Features />
        <TrustCallout />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </>
  );
}
