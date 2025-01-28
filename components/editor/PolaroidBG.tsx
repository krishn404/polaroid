import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

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
  { name: "Light Yellow", color: "#FFFACD" }
]

export default function PolaroidBG({ value, onChange }: PolaroidBGProps) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div 
      initial={false}
      animate={{ height: isOpen ? "auto" : "48px" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden"
    >
      {/* Header */}
      <motion.button 
        className={cn(
          // Mobile styles
          "w-full flex items-center justify-between p-3",
          "rounded-xl bg-white/[0.04] backdrop-blur-xl",
          "transition-all duration-200",
          "hover:bg-white/[0.08]",
          "group",
          // Desktop styles
          "lg:p-4 lg:bg-white/[0.02] lg:hover:bg-white/[0.06]",
          "lg:border lg:border-white/[0.05]"
        )}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={cn(
              // Mobile styles
              "w-6 h-6 rounded-full",
              "ring-2 ring-white/10",
              "transition-all duration-300",
              "group-hover:ring-white/20",
              // Desktop styles
              "lg:w-8 lg:h-8",
              "lg:ring-white/[0.15] lg:group-hover:ring-white/30"
            )}
            style={{ backgroundColor: value }}
            whileHover={{ scale: 1.1 }}
          />
          <span className={cn(
            "text-sm font-medium text-white/80",
            "lg:text-base lg:text-white/90"
          )}>
            Background Color
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className={cn(
            "w-4 h-4 transition-colors duration-200",
            "text-white/40 group-hover:text-white/60",
            "lg:w-5 lg:h-5"
          )} />
        </motion.div>
      </motion.button>

      {/* Color Grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "mt-2 relative",
              // Mobile: horizontal scroll
              "overflow-x-auto scrollbar-hide",
              // Desktop: grid container
              "lg:mt-3"
            )}
          >
            <motion.div
              className={cn(
                // Mobile: horizontal grid
                "grid grid-flow-col auto-cols-[100px] gap-3 p-2",
                // Desktop: compact grid
                "lg:grid-flow-row lg:grid-cols-5",
                "lg:auto-rows-[80px] lg:gap-2 lg:p-2"
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
                    ease: "easeOut"
                  }}
                  onClick={() => onChange(preset.color)}
                  className={cn(
                    "relative group",
                    "transition-all duration-200",
                    value === preset.color && "z-10",
                    // Desktop enhancements
                    "lg:rounded-lg lg:overflow-hidden"
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
                      // Desktop styles
                      "lg:bg-white/[0.03] lg:backdrop-blur-xl"
                    )}
                  />
                  <div className={cn(
                    "relative p-2 flex flex-col gap-2",
                    "lg:p-2 lg:gap-1.5"
                  )}>
                    <div
                      className={cn(
                        "w-full aspect-[4/5] rounded-lg",
                        "ring-1 ring-white/10 shadow-sm",
                        "transition-all duration-200",
                        "group-hover:ring-white/20 group-hover:shadow-lg",
                        value === preset.color && "ring-2 ring-white/30 shadow-lg",
                        // Desktop enhancements - more compact
                        "lg:aspect-[3/2]",
                        "lg:ring-white/[0.15]",
                        "lg:group-hover:ring-white/30",
                        "lg:shadow-lg"
                      )}
                      style={{ backgroundColor: preset.color }}
                    />
                    <span className={cn(
                      "text-xs font-medium text-center",
                      "text-white/60 transition-colors duration-200",
                      "group-hover:text-white/90",
                      value === preset.color && "text-white/90",
                      // Desktop enhancements
                      "lg:text-[11px] lg:font-medium",
                      "lg:text-white/70 lg:group-hover:text-white"
                    )}>
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