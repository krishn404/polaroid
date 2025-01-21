"use client"

import { motion } from "framer-motion"
import { Minus, Plus, RotateCcw, Maximize2, MinusCircle,  PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageControlsProps {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onRotate: () => void
  onReset: () => void
  className?: string
}

export function ImageControls({ zoom, onZoomIn, onZoomOut, onRotate, onReset, className }: ImageControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className={cn(
        "flex items-center gap-2 p-2 rounded-full",
        "bg-black/20 backdrop-blur-lg border border-white/10",
        className,
      )}
    >
      <button onClick={onZoomOut} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <Minus className="w-4 h-4 text-white/70" />
      </button>

      <div className="w-12 text-center text-sm text-white/70">{(zoom * 100).toFixed(0)}%</div>

      <button onClick={onZoomIn} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <Plus className="w-4 h-4 text-white/70" />
      </button>

      <div className="w-px h-4 bg-white/10" />

      <button onClick={onRotate} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <RotateCcw className="w-4 h-4 text-white/70" />
      </button>

      <button onClick={onReset} className="p-2 rounded-full hover:bg-white/10 transition-colors">
        <Maximize2 className="w-4 h-4 text-white/70" />
      </button>
    </motion.div>
  )
}

export function MobileImageControls({  onZoomIn, onZoomOut, onRotate, onReset, className }: ImageControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "fixed bottom-20 left-[15%] -translate-x-1/2 z-50",
        "flex items-center gap-4 p-3 rounded-full",
        "bg-black/50 backdrop-blur-xl border border-white/10",
        "shadow-xl shadow-black/20",
        className,
      )}
    >
      <button onClick={onZoomOut} className="p-3 rounded-full hover:bg-white/10 transition-colors">
        <MinusCircle className="w-6 h-6 text-white/90" />
      </button>

      <button onClick={onRotate} className="p-3 rounded-full hover:bg-white/10 transition-colors">
        <RotateCcw className="w-6 h-6 text-white/90" />
      </button>

      <button onClick={onReset} className="p-3 rounded-full hover:bg-white/10 transition-colors">
        <Maximize2 className="w-6 h-6 text-white/90" />
      </button>

      <button onClick={onZoomIn} className="p-3 rounded-full hover:bg-white/10 transition-colors">
        <PlusCircle className="w-6 h-6 text-white/90" />
      </button>
    </motion.div>
  )
}

