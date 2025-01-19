'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageIcon } from 'lucide-react'
import html2canvas from 'html2canvas'
import { Indie_Flower } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ImageColorGrading } from './color-grading'
import Image from 'next/image'
import TweaksAdjustments from './TweaksAdjustments'
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible"
import BlurredBackground from './BlurredBackground'
import { tools, type ToolId } from '@/lib/tools'
import { presets, type Preset, type Adjustments } from '@/lib/presets'
import BottomNavigation from './BottomNavigation'
import CameraCapture from './CameraCapture'

const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] })

export default function PolaroidGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presets[0])
  const [activeTool, setActiveTool] = useState<ToolId | null>(null)
  const polaroidRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [adjustments, setAdjustments] = useState<Adjustments>(presets[0].adjustments)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setImage(result)
      setBackgroundImage(result)
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

  const handleToolClick = (toolId: ToolId) => {
    setActiveTool(activeTool === toolId ? null : toolId)
  }

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset)
    setAdjustments(preset.adjustments)
  }

  const handleAdjustmentChange = (key: string, value: number) => {
    setAdjustments(prev => ({ ...prev, [key]: value }))
  }

  const handleCameraCapture = (imageData: string) => {
    setImage(imageData)
    setBackgroundImage(imageData)
  }

  useEffect(() => {
    if (image) {
      setProcessedImage(image)
    }
  }, [image])

  const tweaksAdjustments = {
    brightness: { label: 'Brightness', min: 0, max: 2, step: 0.01, value: adjustments.brightness },
    contrast: { label: 'Contrast', min: 0, max: 2, step: 0.01, value: adjustments.contrast },
    saturation: { label: 'Saturation', min: 0, max: 2, step: 0.01, value: adjustments.saturation },
    hue: { label: 'Hue', min: -180, max: 180, step: 1, value: adjustments.hue },
    noise: { label: 'Noise', min: 0, max: 1, step: 0.01, value: adjustments.noise },
    glare: { label: 'Glare', min: 0, max: 1, step: 0.01, value: adjustments.glare },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black/95 to-black/90">
      {isCameraOpen && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setIsCameraOpen(false)}
        />
      )}
      
      <div className="h-screen flex flex-col lg:flex-row lg:overflow-hidden lg:gap-8 lg:p-8">
        {backgroundImage && (
          <BlurredBackground 
            image={backgroundImage} 
            className="animate-fade-in opacity-60"
          />
        )}
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto px-4 py-6 relative z-10 lg:flex lg:items-center lg:justify-center">
          <div className="max-w-md mx-auto space-y-6 lg:max-w-none lg:w-full lg:flex lg:items-center lg:justify-center lg:gap-16 lg:px-4">
            {/* Left side - Polaroid preview */}
            <div className={cn(
              "lg:flex-1 lg:flex lg:justify-end",
              image ? "lg:max-w-xl" : "lg:max-w-2xl"
            )}>
              {/* Header - Only show on mobile */}
              <div className="text-center space-y-1 mb-6 lg:hidden">
                <h1 className="text-2xl font-medium bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent">
                  Polaroid Studio
                </h1>
                <p className="text-sm text-white/50">Create beautiful memories</p>
              </div>

              {!image ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "h-[70vh] transition-all duration-500 ease-out",
                    "border-2 border-dashed rounded-3xl",
                    "flex items-center justify-center",
                    "bg-gradient-to-b from-white/[0.08] to-white/[0.04]",
                    "backdrop-blur-xl backdrop-saturate-150",
                    "lg:flex-1 lg:max-w-2xl lg:mx-auto",
                    isDragging 
                      ? "border-purple-400/50 bg-purple-500/10 scale-[0.99]" 
                      : "border-white/10 hover:border-white/20 hover:bg-white/[0.07]"
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
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-2 border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
                        >
                          Choose Photo
                        </Button>
                        
                      </div>
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
                <>
                  {/* Polaroid Image - Adjusted for desktop */}
                  <div className="space-y-6 animate-fade-in lg:w-[400px]">
                    <div
                      ref={polaroidRef}
                      className={cn(
                        "relative bg-white/90 backdrop-blur-xl rounded-2xl",
                        "transform transition-all duration-500",
                        "hover:scale-[1.02] hover:shadow-2xl"
                      )}
                      style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
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
                  </div>
                </>
              )}
            </div>

            {image && (
              /* Right side - Tools */
              <div className="lg:w-[400px]">
                {/* Tools Menu */}
                <div className="space-y-4 lg:bg-white/5 lg:backdrop-blur-xl lg:rounded-3xl lg:p-6">
                  {/* Tools Bar */}
                  <div className="bg-gradient-to-b from-white/[0.12] to-white/[0.08] backdrop-blur-2xl rounded-2xl p-3 border border-white/10">
                    <div className="flex justify-between items-center gap-2">
                      {tools.map((tool) => (
                        <Button
                          key={tool.id}
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "rounded-xl flex-1 h-14",
                            "backdrop-blur-xl transition-all duration-300",
                            "group relative overflow-hidden",
                            activeTool === tool.id 
                              ? "bg-white/20 text-white shadow-lg" 
                              : "text-white/60 hover:text-white hover:bg-white/10"
                          )}
                          onClick={() => handleToolClick(tool.id)}
                        >
                          <tool.icon className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            "group-hover:scale-110"
                          )} />
                          <div className={cn(
                            "absolute inset-0 rounded-xl opacity-0",
                            "bg-gradient-to-tr from-white/20 to-transparent",
                            "transition-opacity duration-300",
                            "group-hover:opacity-100"
                          )} />
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Tool Panels with Enhanced Animations */}
                  <Collapsible open={activeTool === 'filters'}>
                    <CollapsibleContent className="bg-gradient-to-b from-white/[0.12] to-white/[0.08] backdrop-blur-2xl rounded-2xl p-4 border border-white/10">
                      <div className="grid grid-cols-3 gap-3">
                        {presets.map((preset, index) => (
                          <Button
                            key={preset.name}
                            variant={selectedPreset.name === preset.name ? "default" : "outline"}
                            onClick={() => handlePresetChange(preset)}
                            className={cn(
                              "h-24 aspect-[4/5] flex flex-col items-center justify-center gap-2",
                              "rounded-xl transition-all duration-300",
                              "group relative overflow-hidden",
                              "animate-fade-in",
                              selectedPreset.name === preset.name 
                                ? "bg-gradient-to-tr from-white/25 to-white/15 text-white shadow-lg" 
                                : "bg-black/20 border-white/10 text-white/60 hover:bg-white/10"
                            )}
                            style={{
                              animationDelay: `${index * 50}ms`
                            }}
                          >
                            <preset.icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-sm">{preset.label}</span>
                          </Button>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* <Collapsible open={activeTool === 'frames'}>
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
                  </Collapsible> */}

                  <Collapsible open={activeTool === 'tweaks'}>
                    <CollapsibleContent className="bg-white/5 backdrop-blur-xl rounded-xl p-4 space-y-4">
                      <TweaksAdjustments
                        adjustments={tweaksAdjustments}
                        onChange={handleAdjustmentChange}
                      />
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
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="lg:fixed lg:bottom-0 lg:left-0 lg:right-0 lg:z-20">
          <BottomNavigation
            image={image}
            loading={loading}
            onDownload={downloadImage}
            onFileInputClick={() => fileInputRef.current?.click()}
            onCameraClick={() => setIsCameraOpen(true)}
          />
        </div>
      </div>
    </div>
  )
}

