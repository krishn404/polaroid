"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Camera, Download, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import type { BeforeInstallPromptEvent } from "@/types/pwa"

export default function LandingPage({ onStartCreating }: { onStartCreating: () => void }) {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.95])
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsInstallable(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        console.log("User accepted the install prompt")
        setIsInstallable(false)
      } else {
        console.log("User dismissed the install prompt")
      }
      setDeferredPrompt(null)
    } else {
      // If deferredPrompt is not available, the app might already be installed
      // or the browser doesn't support installation
      console.log("PWA installation not supported or already installed")
      // You can add additional logic here, like opening the app if it's installed
    }
  }

  useEffect(() => {
    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstallable(false)
      }
    }

    window.addEventListener("appinstalled", () => {
      setIsInstallable(false)
    })

    checkInstalled()
    return () => {
      window.removeEventListener("appinstalled", checkInstalled)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black selection:bg-white/20 selection:text-white overflow-y-auto">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/30 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-500/30 rounded-full blur-[128px]" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen">
        {/* Header */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-white" />
                <span className="text-white font-medium">Retrova</span>
              </motion.div>
              <motion.div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleInstallClick}
                    className="bg-purple-500 hover:bg-purple-600 text-white h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                  >
                    {isInstallable ? "Install App" : "Install App"}
                    <Download className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div style={{ opacity, scale }} className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-lg">
                  ✨ Transform your memories into polaroids
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight"
              >
                Create stunning{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-purple-400">
                  polaroid memories
                </span>{" "}
                in seconds
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 max-w-xl mx-auto text-lg"
              >
                Unleash your creativity with our powerful yet simple polaroid maker. Add filters, stickers, and custom
                text to create the perfect vintage look.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center px-4"
              >
                <Button
                  size="lg"
                  onClick={onStartCreating}
                  className="bg-white text-black hover:bg-white/90 h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                >
                  Start Creating Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  onClick={handleInstallClick}
                  className="bg-purple-500 hover:bg-purple-600 text-white h-10 sm:h-12 px-4 sm:px-6 text-sm sm:text-base"
                >
                  {isInstallable ? "Install App" : "Install App"}
                  <Download className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

