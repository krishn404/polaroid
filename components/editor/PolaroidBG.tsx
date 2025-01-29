"use client"

import { cn } from "@/lib/utils"
import { Paintbrush } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { HexColorPicker } from "react-colorful"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface PolaroidBGProps {
  value: string
  onChange: (color: string) => void
}

const presetColors = [
  { name: "Classic White", color: "#FFFFFF" },
  { name: "Vintage Cream", color: "#F5F5DC" },
  { name: "Soft Gray", color: "#F0F0F0" },
  { name: "Pastel Pink", color: "#FFE4E1" },
  { name: "Baby Blue", color: "#F0F8FF" },
  { name: "Mint Green", color: "#F0FFF0" },
  { name: "Lavender", color: "#E6E6FA" },
  { name: "Peach", color: "#FFDAB9" },
  { name: "Ivory", color: "#FFFFF0" },
  { name: "Light Yellow", color: "#FFFACD" },
]

export default function PolaroidBG({ value, onChange }: PolaroidBGProps) {
  const [isOpen] = useState(true)
  const [showColorPicker, setShowColorPicker] = useState(false)

  return (
    <motion.div
      initial={false}
      animate={{ height: isOpen ? "auto" : "48px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={cn(
            "flex-1 flex items-center justify-between p-3",
            "rounded-xl bg-white/[0.04] backdrop-blur-xl",
            "transition-all duration-200",
            "hover:bg-white/[0.08]",
            "group",
            "lg:p-4 lg:bg-white/[0.02] lg:hover:bg-white/[0.06]",
            "lg:border lg:border-white/[0.05]",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full",
                "ring-2 ring-white/10",
                "transition-all duration-300",
                "group-hover:ring-white/20",
                "lg:w-8 lg:h-8",
                "lg:ring-white/[0.15] lg:group-hover:ring-white/30",
              )}
              style={{ backgroundColor: value }}
            />
            <span className={cn("text-sm font-medium text-white/80", "lg:text-base lg:text-white/90")}>
              Background Color
            </span>
          </div>
          
        </div>
        <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 ml-2 border-white/10 bg-white/5 hover:bg-white/10">
              <div className="mr-2 h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: value }} />
              <Paintbrush className="h-4 w-4 text-white/60" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto border-white/10 bg-black/90 backdrop-blur-xl p-3" align="end">
            <HexColorPicker color={value} onChange={onChange} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Color Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("relative", "overflow-x-auto scrollbar-hide", "lg:mt-3")}
          >
            <motion.div
              className={cn(
                "grid grid-flow-col auto-cols-[100px] gap-3 p-2",
                "lg:grid-flow-row lg:grid-cols-5",
                "lg:auto-rows-[80px] lg:gap-2 lg:p-2",
              )}
            >
              {presetColors.map((preset, index) => (
                <motion.button
                  key={preset.color}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  onClick={() => onChange(preset.color)}
                  className={cn(
                    "relative group",
                    "transition-all duration-200",
                    value === preset.color && "z-10",
                    "lg:rounded-lg lg:overflow-hidden",
                  )}
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={cn(
                      "absolute inset-0 rounded-lg",
                      "opacity-0 transition-opacity duration-200",
                      "group-hover:opacity-100",
                      value === preset.color && "opacity-100",
                      "lg:bg-white/[0.03] lg:backdrop-blur-xl",
                    )}
                  />
                  <div className={cn("relative p-2 flex flex-col gap-2", "lg:p-2 lg:gap-1.5")}>
                    <div
                      className={cn(
                        "w-full aspect-[4/5] rounded-lg",
                        "ring-1 ring-white/10 shadow-sm",
                        "transition-all duration-200",
                        "group-hover:ring-white/20 group-hover:shadow-lg",
                        value === preset.color && "ring-2 ring-white/30 shadow-lg",
                        "lg:aspect-[3/2]",
                        "lg:ring-white/[0.15]",
                        "lg:group-hover:ring-white/30",
                        "lg:shadow-lg",
                      )}
                      style={{ backgroundColor: preset.color }}
                    />
                    <span
                      className={cn(
                        "text-xs font-medium text-center",
                        "text-white/60 transition-colors duration-200",
                        "group-hover:text-white/90",
                        value === preset.color && "text-white/90",
                        "lg:text-[11px] lg:font-medium",
                        "lg:text-white/70 lg:group-hover:text-white",
                      )}
                    >
                      {preset.name}
                    </span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

