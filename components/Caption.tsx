'use client'

import { Input } from "@/components/ui/input"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import { Slider } from "@/components/ui/slider"
import { 
  Indie_Flower,
  Homemade_Apple,
  Caveat,
  Shadows_Into_Light,
  Kalam,
  Gloria_Hallelujah,
  Patrick_Hand,
  Architects_Daughter,
  Dancing_Script,
  Pacifico,
  Amatic_SC,
  Sacramento,
  Satisfy,
  Permanent_Marker,
  Rock_Salt,
  Covered_By_Your_Grace,
  Reenie_Beanie,
  Just_Another_Hand,
  Nothing_You_Could_Do,
  Waiting_for_the_Sunrise,
  Cedarville_Cursive,
  Loved_by_the_King,
  La_Belle_Aurore,
  Zeyada
} from 'next/font/google'
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

// Initialize all fonts
const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] })
const homemadeApple = Homemade_Apple({ weight: '400', subsets: ['latin'] })
const caveat = Caveat({ subsets: ['latin'] })
const shadowsIntoLight = Shadows_Into_Light({ weight: '400', subsets: ['latin'] })
const kalam = Kalam({ weight: '400', subsets: ['latin'] })
const gloriaHallelujah = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] })
const patrickHand = Patrick_Hand({ weight: '400', subsets: ['latin'] })
const architectsDaughter = Architects_Daughter({ weight: '400', subsets: ['latin'] })
const dancingScript = Dancing_Script({ subsets: ['latin'] })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })
const amaticSC = Amatic_SC({ weight: '400', subsets: ['latin'] })
const sacramento = Sacramento({ weight: '400', subsets: ['latin'] })
const satisfy = Satisfy({ weight: '400', subsets: ['latin'] })
const permanentMarker = Permanent_Marker({ weight: '400', subsets: ['latin'] })
const rockSalt = Rock_Salt({ weight: '400', subsets: ['latin'] })
const coveredByYourGrace = Covered_By_Your_Grace({ weight: '400', subsets: ['latin'] })
const reenieBeanie = Reenie_Beanie({ weight: '400', subsets: ['latin'] })
const justAnotherHand = Just_Another_Hand({ weight: '400', subsets: ['latin'] })
const nothingYouCouldDo = Nothing_You_Could_Do({ weight: '400', subsets: ['latin'] })
const waitingForTheSunrise = Waiting_for_the_Sunrise({ weight: '400', subsets: ['latin'] })
const cedarvilleCursive = Cedarville_Cursive({ weight: '400', subsets: ['latin'] })
const lovedByTheKing = Loved_by_the_King({ weight: '400', subsets: ['latin'] })
const laBelleAurore = La_Belle_Aurore({ weight: '400', subsets: ['latin'] })
const zeyada = Zeyada({ weight: '400', subsets: ['latin'] })

const fonts = {
  indieFlower,
  homemadeApple,
  caveat,
  shadowsIntoLight,
  kalam,
  gloriaHallelujah,
  patrickHand,
  architectsDaughter,
  dancingScript,
  pacifico,
  amaticSC,
  sacramento,
  satisfy,
  permanentMarker,
  rockSalt,
  coveredByYourGrace,
  reenieBeanie,
  justAnotherHand,
  nothingYouCouldDo,
  waitingForTheSunrise,
  cedarvilleCursive,
  lovedByTheKing,
  laBelleAurore,
  zeyada
}

const fontOptions = [
  { id: 'indieFlower', name: 'Indie Flower' },
  { id: 'homemadeApple', name: 'Homemade Apple' },
  { id: 'caveat', name: 'Caveat' },
  { id: 'shadowsIntoLight', name: 'Shadows Into Light' },
  { id: 'kalam', name: 'Kalam' },
  { id: 'gloriaHallelujah', name: 'Gloria Hallelujah' },
  { id: 'patrickHand', name: 'Patrick Hand' },
  { id: 'architectsDaughter', name: 'Architects Daughter' },
  { id: 'dancingScript', name: 'Dancing Script' },
  { id: 'pacifico', name: 'Pacifico' },
  { id: 'amaticSC', name: 'Amatic SC' },
  { id: 'sacramento', name: 'Sacramento' },
  { id: 'satisfy', name: 'Satisfy' },
  { id: 'permanentMarker', name: 'Permanent Marker' },
  { id: 'rockSalt', name: 'Rock Salt' },
  { id: 'coveredByYourGrace', name: 'Covered By Grace' },
  { id: 'reenieBeanie', name: 'Reenie Beanie' },
  { id: 'justAnotherHand', name: 'Just Another Hand' },
  { id: 'nothingYouCouldDo', name: 'Nothing You Could Do' },
  { id: 'waitingForTheSunrise', name: 'Waiting for Sunrise' },
  { id: 'cedarvilleCursive', name: 'Cedarville' },
  { id: 'lovedByTheKing', name: 'Loved by the King' },
  { id: 'laBelleAurore', name: 'La Belle Aurore' },
  { id: 'zeyada', name: 'Zeyada' }
]

interface CaptionProps {
  caption: string
  isOpen: boolean
  onChange: (value: string) => void
  selectedFont?: string
  onFontChange?: (font: string) => void
  fontSize?: number
  onFontSizeChange?: (size: number) => void
}

export default function Caption({ 
  caption, 
  isOpen, 
  onChange,
  selectedFont = 'indieFlower',
  onFontChange = () => {},
  fontSize = 16,
  onFontSizeChange = () => {}
}: CaptionProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const fontsPerPage = 8
  const totalPages = Math.ceil(fontOptions.length / fontsPerPage)
  
  const nextPage = () => setCurrentPage((prev) => (prev + 1) % totalPages)
  const prevPage = () => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  
  const currentFonts = fontOptions.slice(
    currentPage * fontsPerPage,
    (currentPage + 1) * fontsPerPage
  )

  return (
    <Collapsible open={isOpen}>
      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4 space-y-3">
        <Input
          type="text"
          value={caption}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Add a caption..."
          maxLength={50}
          className={cn(
            "bg-black/20 border-white/10 text-white placeholder:text-white/40",
            fonts[selectedFont as keyof typeof fonts]?.className || fonts.indieFlower.className
          )}
        />

        {/* Font size slider */}
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm min-w-[3rem]">Size</span>
          <Slider
            min={12}
            max={32}
            step={1}
            value={[fontSize]}
            onValueChange={([value]) => onFontSizeChange(value)}
            className="w-full"
          />
          <span className="text-white/60 text-sm min-w-[2rem] text-right">{fontSize}px</span>
        </div>

        {/* Font options with navigation */}
        <div className="relative">
          <div className="grid grid-cols-4 gap-2">
            {currentFonts.map((font) => (
              <button
                key={font.id}
                onClick={() => onFontChange(font.id)}
                className={cn(
                  "p-2 rounded-lg text-center transition-colors",
                  selectedFont === font.id 
                    ? "bg-white/10 text-white" 
                    : "text-white/60 hover:bg-white/5",
                  fonts[font.id as keyof typeof fonts].className
                )}
              >
                Aa
              </button>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={prevPage}
            className="absolute -left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 text-white/60 hover:bg-black/30 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextPage}
            className="absolute -right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/20 text-white/60 hover:bg-black/30 hover:text-white"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Page indicator */}
          <div className="mt-2 flex justify-center gap-1">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  currentPage === index
                    ? "bg-white"
                    : "bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}