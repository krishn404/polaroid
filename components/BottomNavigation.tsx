import { Button } from "@/components/ui/button"
import { Download, Camera, Wand2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
  image: string | null
  loading: boolean
  onDownload: () => void
  onFileInputClick: () => void
}

export default function BottomNavigation({ 
  image, 
  loading, 
  onDownload, 
  onFileInputClick 
}: BottomNavigationProps) {
  return (
    <div className="px-6 py-4 backdrop-blur-2xl border-t border-white/10">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around gap-3">
          {['Try On', 'Download', 'Camera'].map((action) => (
            <Button
              key={action}
              variant="ghost"
              className={cn(
                "flex-1 h-16",
                action === 'Download' ? "rounded-[30px]" : "rounded-full",
                action !== 'Download' && "bg-zinc-900",
                action === 'Download' && "bg-gradient-to-r from-pink-500 to-purple-500 px-8",
                "text-white/60 hover:text-white",
                "transition-all duration-300",
                "group relative overflow-hidden"
              )}
              onClick={action === 'Download' ? onDownload : onFileInputClick}
              disabled={action === 'Download' && (!image || loading)}
            >
              <div className="flex flex-col gap-1 items-center relative z-10">
                {action === 'Try On' && <Wand2 className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />}
                {action === 'Download' && <Download className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />}
                {action === 'Camera' && <Camera className="h-7 w-7 group-hover:scale-110 transition-transform duration-300" />}
                <span className="text-xs font-medium">{action}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
} 