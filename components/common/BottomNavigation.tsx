'use client'

import { Button } from "@/components/ui/button"
import { Download, Camera, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import ReplaceImage from "./ReplaceImage"

interface BottomNavigationProps {
  image: string | null
  loading: boolean
  onDownload: () => void
  onFileInputClick: () => void
  onCameraClick: () => void
  onReplace: (file: File) => void
}

export default function BottomNavigation({
  image,
  loading,
  onDownload,
  onFileInputClick,
  onCameraClick,
  onReplace,
}: BottomNavigationProps) {
  return (
    <div className="px-6 py-4 backdrop-blur-2xl border-t border-white/10 lg:border-none lg:bg-transparent">
      <div className="max-w-md mx-auto lg:max-w-lg">
        <div className="flex items-center justify-around gap-3 lg:justify-center lg:gap-4">
          {image ? (
            <>
              <ReplaceImage onReplace={onReplace} />
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 h-16 lg:flex-initial lg:px-8",
                  "rounded-full bg-zinc-900",
                  "text-white/60 hover:text-black",
                  "transition-all duration-300",
                  "group relative overflow-hidden"
                )}
                onClick={onCameraClick}
              >
                <div className="flex flex-col gap-1 items-center relative z-10 lg:flex-row lg:gap-2">
                  <Camera className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium lg:text-sm">Camera</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 h-16 lg:flex-initial lg:px-8",
                  "rounded-[30px]",
                  "bg-gradient-to-r from-pink-500 to-purple-500",
                  "text-white/60 hover:text-black",
                  "transition-all duration-300",
                  "group relative overflow-hidden"
                )}
                onClick={onDownload}
                disabled={loading}
              >
                <div className="flex flex-col gap-1 items-center relative z-10 lg:flex-row lg:gap-2">
                  <Download className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium lg:text-sm">Download</span>
                </div>
              </Button>
            </>
          ) : (
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
                onClick={onFileInputClick}
              >
                <div className="flex flex-col gap-1 items-center relative z-10 lg:flex-row lg:gap-2">
                  <Wand2 className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium lg:text-sm">Try On</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "flex-1 h-16 lg:flex-initial lg:px-8",
                  "rounded-full bg-zinc-900",
                    "text-white/60 hover:text-black",
                  "transition-all duration-300",
                  "group relative overflow-hidden"
                )}
                onClick={onCameraClick}
              >
                <div className="flex flex-col gap-1 items-center relative z-10 lg:flex-row lg:gap-2">
                  <Camera className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs font-medium lg:text-sm">Camera</span>
                </div>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

