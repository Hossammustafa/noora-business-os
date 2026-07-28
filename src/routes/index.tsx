import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/noora/Nav";
import { Hero } from "@/components/noora/Hero";
import { Problem } from "@/components/noora/Problem";
import { Modules } from "@/components/noora/Modules";
import { Features } from "@/components/noora/Features";
import { Integrations } from "@/components/noora/Integrations";
import { Pricing } from "@/components/noora/Pricing";
import { CTA } from "@/components/noora/CTA";
import { Footer } from "@/components/noora/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Modules />
        <Features />
        <Integrations />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
