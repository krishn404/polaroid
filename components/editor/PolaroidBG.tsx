import { cn } from "@/lib/utils"

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
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-full border-2 border-white/20"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm text-white/60">Background Color</span>
      </div>

      <div className="relative">
        <div className={cn(
          "py-2 px-1",
          // Mobile: horizontal scrolling
          "h-[120px] overflow-x-auto scrollbar-hide",
          // Desktop: vertical grid with scrolling
          "lg:h-[300px] lg:overflow-y-auto lg:overflow-x-hidden lg:scrollbar-thin lg:scrollbar-thumb-white/10 lg:scrollbar-track-transparent lg:pr-2"
        )}>
          <div className={cn(
            // Mobile: horizontal grid
            "grid grid-flow-col auto-cols-[100px] gap-3",
            // Desktop: vertical grid
            "lg:grid-flow-row lg:grid-cols-2 lg:auto-rows-[100px]"
          )}>
            {presetColors.map((preset) => (
              <button
                key={preset.color}
                onClick={() => onChange(preset.color)}
                className={cn(
                  "group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200",
                  "hover:bg-white/5 hover:backdrop-blur-xl",
                  value === preset.color && "bg-white/5 backdrop-blur-xl"
                )}
              >
                <div
                  className="w-full aspect-[4/5] rounded-lg border-2 border-white/10"
                  style={{ backgroundColor: preset.color }}
                />
                <span className="text-xs text-white/60 group-hover:text-white/80">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 