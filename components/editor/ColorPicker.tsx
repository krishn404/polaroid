'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

interface ColorPickerProps {
  onChange: (color: string) => void;
  value: string;
}

const presetColors = [
  { color: '#FFFFFF', name: 'Classic White' },
  { color: '#F5F5DC', name: 'Vintage Beige' },
  { color: '#FFF8DC', name: 'Warm Cream' },
  { color: '#FAF9F6', name: 'Off White' },
  { color: '#FFF5E1', name: 'Soft Peach' },
  { color: '#F0EAD6', name: 'Parchment' },
  { color: '#FFE4C4', name: 'Bisque' },
  { color: '#F8F0E3', name: 'Eggshell' },
  { color: '#FAEBD7', name: 'Antique' },
  { color: '#FDF5E6', name: 'Old Lace' },
]

export default function ColorPicker({ onChange, value }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const currentColorName = presetColors.find(c => c.color.toLowerCase() === value.toLowerCase())?.name || 'Custom'

  return (
    <div className="space-y-4">
      {/* Color Preview and Selector Button */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Polaroid Background</label>
          <span className="text-xs text-white/60">{currentColorName}</span>
        </div>
        <Button
          variant="outline"
          onClick={() => setShowPicker(!showPicker)}
          className={cn(
            "w-full h-12 relative group transition-all duration-300",
            "bg-black/20 hover:bg-black/30 border-white/10",
            "flex items-center justify-between",
            showPicker && "ring-2 ring-white/20"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-6 h-6 rounded-full transition-transform duration-300",
                "ring-2 ring-offset-2 ring-offset-black/50 ring-white/20",
                "group-hover:scale-110"
              )}
              style={{ backgroundColor: value }}
            />
            <span className="text-white/80">Select Color</span>
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 text-white/60 transition-transform duration-300",
            showPicker && "rotate-180"
          )} />
        </Button>
      </div>

      {/* Preset Colors Panel */}
      {showPicker && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <label className="text-sm font-medium text-white/80">Preset Colors</label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map(({ color, name }) => (
                <button
                  key={color}
                  onClick={() => {
                    onChange(color)
                    setShowPicker(false)
                  }}
                  className="group relative"
                >
                  <div
                    className={cn(
                      "w-full aspect-square rounded-xl transition-all duration-200",
                      "ring-2 ring-offset-2 ring-offset-black/50",
                      "group-hover:scale-105 group-active:scale-95",
                      value === color ? "ring-white" : "ring-white/20 group-hover:ring-white/40"
                    )}
                    style={{ backgroundColor: color }}
                  />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs text-white/60 whitespace-nowrap">{name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 