'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, ImageIcon, X, Camera, Sunset, Moon, Sun, Sparkles } from 'lucide-react'
import html2canvas from 'html2canvas'
import { Indie_Flower } from 'next/font/google'
import { cn } from '@/lib/utils'
import { ImageColorGrading } from './color-grading'
import Image from 'next/image'
import SharePolaroid from '@/components/SharePolaroid'

const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] })

const presets = [
  { name: 'original', label: 'Natural', icon: Camera },
  { name: 'vintage', label: 'Retro', icon: Sunset },
  { name: 'blackAndWhite', label: 'Mono', icon: Moon },
  { name: 'warm', label: 'Sunny', icon: Sun },
  { name: 'cool', label: 'Fresh', icon: Sparkles },
]

export default function PolaroidGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [captionPosition, setCaptionPosition] = useState({ x: 50, y: 85 })
  const [isDraggingCaption, setIsDraggingCaption] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presets[0])
  const polaroidRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const captionRef = useRef<HTMLParagraphElement>(null)
  const [isSharing, setIsSharing] = useState(false)

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

  const clearImage = () => {
    setImage(null)
    setProcessedImage(null)
    setCaption('')
    setCaptionPosition({ x: 50, y: 85 })
    setSelectedPreset(presets[0])
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (captionRef.current && captionRef.current.contains(e.target as Node)) {
      setIsDraggingCaption(true)
      e.stopPropagation()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingCaption && polaroidRef.current) {
      const rect = polaroidRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
      setCaptionPosition({ x, y })
    }
  }

  const handleMouseUp = () => {
    setIsDraggingCaption(false)
  }

  useEffect(() => {
    if (image) {
      setProcessedImage(image)
    }
  }, [image])

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      <div className="h-screen flex flex-col">
        {/* Main Content */}
        <div 
          className="flex-1 overflow-auto px-4 py-6"
        >
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
                  "backdrop-blur-xl bg-white/10",
                  isDragging ? "border-purple-400 bg-purple-500/20" : "border-white/20 hover:border-white/40"
                )}
              >
                <div className="text-center space-y-4 p-6">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 backdrop-blur-xl flex items-center justify-center">
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
                      className="mt-2 border-white/20 bg-black text-white/80 hover:bg-white"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
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
              <div 
                className="relative"
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-2 -top-2 rounded-full z-10 bg-black/40 border-white/20 text-white/80 hover:bg-black/60"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div
                  ref={polaroidRef}
                  className="relative bg-white rounded-2xl transform transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                >
                  <div className="p-3">
                    <div 
                      className="aspect-[4/5] relative overflow-hidden rounded-xl"
                    >
                      {image && (
                        <ImageColorGrading
                          image={image}
                          preset={selectedPreset.name}
                          onProcessedImageChange={setProcessedImage}
                        />
                      )}
                      {processedImage && (
                        <Image
                          src={processedImage}
                          alt="Processed image"
                          layout="fill"
                          objectFit="cover"
                        />
                      )}
                    </div>
                    <div className="h-16 flex items-center justify-center mt-2 relative">
                      {caption && (
                        <p
                          ref={captionRef}
                          className={`absolute text-center text-xl text-gray-800 leading-tight cursor-move ${indieFlower.className}`}
                          style={{
                            left: `${captionPosition.x}%`,
                            top: `${captionPosition.y}%`,
                            transform: 'translate(-50%, -50%) rotate(-2deg)',
                            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          {caption}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Caption Input */}
                <div className="mt-6 space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Add a caption..."
                      maxLength={50}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl backdrop-blur-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div 
          className="px-6 py-4 bg-black/20 backdrop-blur-xl"
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-around">
              {presets.map((preset) => (
                <div
                  key={preset.name}
                  className={cn(
                    "flex flex-col items-center gap-1",
                    "transition-all duration-200"
                  )}
                  onClick={() => setSelectedPreset(preset)}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full w-12 h-12 backdrop-blur-sm",
                      selectedPreset.name === preset.name
                        ? "bg-purple-500/20 text-white"
                        : "bg-white/10 text-white/60 hover:bg-white/20"
                    )}
                  >
                    <preset.icon className="w-5 h-5" />
                  </Button>
                  <span className="text-xs text-white/60">
                    {preset.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <Button
                onClick={downloadImage}
                disabled={!image || loading}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-8"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
              <SharePolaroid
                polaroidRef={polaroidRef}
                isLoading={isSharing}
                setIsLoading={setIsSharing}
              />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
