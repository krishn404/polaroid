"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import PolaroidStack from "../components/layout/polaroid-stack"
import LandingPage from "../components/layout/landing-page"
import PolaroidGenerator from "../components/layout/polaroid-generator"

export default function Home() {
  const [stage, setStage] = useState("preloader")

  const handlePreloaderComplete = () => {
    setStage("landing")
  }

  const handleStartCreating = () => {
    setStage("generator")
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {stage === "preloader" && (
          <motion.div 
            key="preloader" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <PolaroidStack onComplete={handlePreloaderComplete} />
          </motion.div>
        )}

        {stage === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LandingPage onStartCreating={handleStartCreating} />
          </motion.div>
        )}

        {stage === "generator" && (
          <motion.div 
            key="generator" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <PolaroidGenerator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

