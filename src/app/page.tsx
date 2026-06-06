"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/hero/HeroSection";
import { MemoryArchive } from "@/components/sections/MemoryArchive";
import { IntelligenceDomains } from "@/components/sections/IntelligenceDomains";
import { FeaturedEvents } from "@/components/sections/FeaturedEvents";
import { SpeakersSection } from "@/components/sections/SpeakersSection";
import { LiveData } from "@/components/sections/LiveData";
import { ParticipationExperience } from "@/components/sections/ParticipationExperience";
import { FinalEvolution } from "@/components/sections/FinalEvolution";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <SmoothScrollProvider>
      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <main className="relative bg-background">
          <Navigation />
          <HeroSection />
          <MemoryArchive />
          <IntelligenceDomains />
          <FeaturedEvents />
          <SpeakersSection />
          <LiveData />
          <ParticipationExperience />
          <FinalEvolution />
          <Footer />
        </main>
      )}
    </SmoothScrollProvider>
  );
}
