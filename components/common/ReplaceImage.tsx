'use client'

import { useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Wand2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReplaceImageProps {
  onReplace: (file: File) => void
}

export default function ReplaceImage({ onReplace }: ReplaceImageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onReplace(file)
    }
  }

  return (
    <>
      <Button
        variant="ghost"
        className={cn(
          "flex-1 h-16 lg:flex-initial lg:px-8",
          "rounded-full bg-zinc-900",
          "text-white/60 hover:text-black",
          "transition-all duration-300",
          "group relative overflow-hidden"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="flex flex-col gap-1 items-center relative z-10 lg:flex-row lg:gap-2">
          <Wand2 className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
          <span className="text-xs font-medium lg:text-sm">Replace</span>
        </div>
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
} 