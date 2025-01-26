"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Download, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { BeforeInstallPromptEvent } from "@/types/pwa";

export default function LandingPage({ onStartCreating }: { onStartCreating: () => void }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.95]);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstallable(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      console.log("Install prompt is not available");
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-white/20 selection:text-white overflow-y-auto">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/30 rounded-full blur-[128px]" />
      </div>
      <div className="relative min-h-screen">
        <motion.header className="fixed top-0 left-0 right-0 z-50">
          <div className="mx-auto px-6 py-4 flex items-center justify-between">
            <motion.div className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-white" />
              <span className="text-white font-medium">Retrova</span>
            </motion.div>
            <Button onClick={handleInstallClick} className="bg-purple-500 text-white px-6 h-10">
              {isInstallable ? "Install App" : "Install App"}
              <Download className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.header>
        <div className="pt-32 pb-20 px-6 text-center">
          <motion.div style={{ opacity, scale }}>
            <motion.h1 className="text-4xl md:text-6xl font-bold text-white">
              Create stunning{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                polaroid memories
              </span>
            </motion.h1>
            <motion.p className="text-gray-400 max-w-xl mx-auto text-lg">
              Unleash your creativity with our powerful yet simple polaroid maker.
            </motion.p>
            <Button
              onClick={onStartCreating}
              className="bg-white text-black px-6 mt-8"
            >
              Start Creating
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
