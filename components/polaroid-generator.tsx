'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon, Download, Camera, Wand2, Frame, Palette, Sliders, Sticker, Type } from 'lucide-react'
import html2canvas from 'html2canvas'
import { Indie_Flower } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ImageColorGrading } from './color-grading'
import Image from 'next/image'
import { Slider } from "@/components/ui/slider"
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"

const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] })

const tools = [
  { id: 'frames', icon: Frame, label: 'Frames' },
  { id: 'filters', icon: Palette, label: 'Filters' },
  { id: 'tweaks', icon: Sliders, label: 'Tweaks' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
  { id: 'caption', icon: Type, label: 'Caption' }
]

const presets = [
  { name: 'original', label: 'Natural' },
  { name: 'vintage', label: 'Retro' },
  { name: 'blackAndWhite', label: 'Mono' },
  { name: 'warm', label: 'Sunny' },
  { name: 'cool', label: 'Fresh' },
]

interface Adjustments {
  brightness: number
  contrast: number
  saturation: number
  hue: number
  noise: number
  glare: number
}

export default function PolaroidGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presets[0])
  const [activeTool, setActiveTool] = useState<string | null>(null)
  const polaroidRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [adjustments, setAdjustments] = useState<Adjustments>({
    brightness: 1,
    contrast: 1,
    saturation: 1,
    hue: 0,
    noise: 0,
    glare: 0
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      setImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  const downloadImage = async () => {
    if (!polaroidRef.current || !processedImage) return
    
    setLoading(true)
    try {
      const canvas = await html2canvas(polaroidRef.current, {
        backgroundColor: null,
      })
      
      const link = document.createElement('a')
      link.download = 'polaroid.png'
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToolClick = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId)
  }

  useEffect(() => {
    if (image) {
      setProcessedImage(image)
    }
  }, [image])

  return (
    <div className="min-h-screen bg-black">
      <div className="h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-4 py-6">
          <div className="max-w-md mx-auto">
            {!image ? (
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "h-[70vh] transition-all duration-300 ease-in-out",
                  "border-2 border-dashed rounded-3xl",
                  "flex items-center justify-center",
                  "bg-zinc-900",
                  isDragging ? "border-purple-400 bg-purple-500/20" : "border-white/20 hover:border-white/40"
                )}
              >
                <div className="text-center space-y-4 p-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                      <ImageIcon className="h-10 w-10 text-white/80" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-white/80">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-white/60">
                      or
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                    >
                      Choose Photo
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div
                  ref={polaroidRef}
                  className="relative bg-white rounded-2xl transform transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className="p-3">
                    <div className="aspect-[4/5] relative overflow-hidden rounded-xl">
                      {image && (
                        <ImageColorGrading
                          image={image}
                          preset={selectedPreset.name}
                          adjustments={adjustments}
                          onProcessedImageChange={setProcessedImage}
                        />
                      )}
                      {processedImage && (
                        <Image
                          src={processedImage || "/placeholder.svg"}
                          alt="Processed image"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="h-16 flex items-center justify-center mt-2 relative">
                      {caption && (
                        <p className={`text-center text-xl text-gray-800 leading-tight ${indieFlower.className}`}>
                          {caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tools Menu */}
                {image && (
                  <div className="space-y-4">
                    {/* Tools Bar */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-full p-2">
                      <div className="flex justify-between items-center">
                        {tools.map((tool) => (
                          <Button
                            key={tool.id}
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "rounded-full",
                              activeTool === tool.id 
                                ? "bg-white/20 text-white" 
                                : "text-white/60 hover:text-white hover:bg-white/10"
                            )}
                            onClick={() => handleToolClick(tool.id)}
                          >
                            <tool.icon className="h-5 w-5" />
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Tool Panels */}
                    <Collapsible open={activeTool === 'frames'}>
                      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4">
                        <div className="grid grid-cols-3 gap-4">
                          {['Classic', 'Modern', 'Vintage'].map((frame) => (
                            <Button
                              key={frame}
                              variant="outline"
                              className="h-24 aspect-[4/5] bg-black/20 border-white/10 text-white/60"
                            >
                              {frame}
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={activeTool === 'filters'}>
                      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4">
                        <div className="grid grid-cols-3 gap-4">
                          {presets.map((preset) => (
                            <Button
                              key={preset.name}
                              variant={selectedPreset.name === preset.name ? "default" : "outline"}
                              onClick={() => setSelectedPreset(preset)}
                              className={cn(
                                "h-24 aspect-[4/5]",
                                selectedPreset.name === preset.name 
                                  ? "bg-white/20 text-white border-white/20"
                                  : "bg-black/20 border-white/10 text-white/60"
                              )}
                            >
                              {preset.label}
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={activeTool === 'tweaks'}>
                      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4 space-y-4">
                        {Object.entries(adjustments).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <div className="flex justify-between">
                              <label className="text-white/60 text-xs capitalize">{key}</label>
                              <span className="text-white/60 text-xs">{value.toFixed(2)}</span>
                            </div>
                            <Slider
                              value={[value]}
                              min={key === 'hue' ? -180 : 0}
                              max={key === 'hue' ? 180 : key === 'brightness' || key === 'contrast' ? 2 : 1}
                              step={0.01}
                              onValueChange={([newValue]) => {
                                setAdjustments(prev => ({
                                  ...prev,
                                  [key]: newValue
                                }))
                              }}
                            />
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={activeTool === 'stickers'}>
                      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4">
                        <div className="grid grid-cols-4 gap-4">
                          {[1,2,3,4,5,6,7,8].map((i) => (
                            <Button
                              key={i}
                              variant="outline"
                              className="h-16 aspect-square bg-black/20 border-white/10 text-white/60"
                            >
                              {i}
                            </Button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={activeTool === 'caption'}>
                      <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4">
                        <Input
                          type="text"
                          value={caption}
                          onChange={(e) => setCaption(e.target.value)}
                          placeholder="Add a caption..."
                          maxLength={50}
                          className="bg-black/20 border-white/10 text-white placeholder:text-white/40"
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-6 py-4 bg-zinc-900/80 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around">
              <Button
                variant="ghost"
                size="lg"
                className="flex-col gap-1 text-white/60 hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Wand2 className="h-6 w-6" />
                <span className="text-xs">Try On</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex-col gap-1 text-white/60 hover:text-white"
                onClick={downloadImage}
                disabled={!image || loading}
              >
                <Download className="h-6 w-6" />
                <span className="text-xs">Download</span>
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="flex-col gap-1 text-white/60 hover:text-white"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-6 w-6" />
                <span className="text-xs">Camera</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

