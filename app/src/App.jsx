import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Nav from "./components/landing/Nav";
import Hero from "./components/landing/Hero";
import Marquee from "./components/landing/Marquee";
import Problem from "./components/landing/Problem";
import Solution from "./components/landing/Solution";
import Features from "./components/landing/Features";
import DashboardSection from "./components/landing/DashboardSection";
import ROICalculator from "./components/landing/ROICalculator";
import Architecture from "./components/landing/Architecture";
import Integrations from "./components/landing/Integrations";
import Security from "./components/landing/Security";
import Pricing from "./components/landing/Pricing";
import FAQ from "./components/landing/FAQ";
import FinalCTA from "./components/landing/FinalCTA";
import DemoModal from "./components/landing/DemoModal";

function App() {
  const [demoOpen, setDemoOpen] = useState(false);
  const openDemo = useCallback(() => setDemoOpen(true), []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <div className="App bg-ink text-text-primary font-sans antialiased">
      <Nav onBookDemo={openDemo} />
      <main>
        <Hero onBookDemo={openDemo} />
        <Marquee />
        <Problem />
        <Solution />
        <Features />
        <DashboardSection />
        <ROICalculator />
        <Architecture />
        <Integrations />
        <Security />
        <Pricing onBookDemo={openDemo} />
        <FAQ />
        <FinalCTA onBookDemo={openDemo} />
      </main>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
