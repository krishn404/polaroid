'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, X, ImageIcon } from 'lucide-react'
import html2canvas from 'html2canvas'
import { Indie_Flower } from 'next/font/google'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const indieFlower = Indie_Flower({ weight: '400', subsets: ['latin'] })

// Simulated presets
const presets = [
  { name: 'Original', filter: '' },
  { name: 'Vintage', filter: 'brightness(100%) contrast(90%) saturate(150%) sepia(35%) hue-rotate(15deg) grayscale(10%)' },
  { name: 'B&W', filter: 'grayscale(100%) contrast(120%)' },
  { name: 'Warm', filter: 'saturate(150%) brightness(105%) contrast(105%) hue-rotate(10deg)' },
  { name: 'Cool', filter: 'saturate(90%) brightness(100%) contrast(105%) hue-rotate(-10deg)' },
]

export default function PolaroidGenerator() {
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState(presets[0])
  const polaroidRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (!polaroidRef.current || !image) return
    
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
    setCaption('')
    setSelectedPreset(presets[0])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            Polaroid Generator
          </h1>
          <p className="text-gray-600">
            Create beautiful memories with custom presets
          </p>
        </div>

        <Card className="overflow-hidden backdrop-blur-xl bg-white/80 border-0 shadow-2xl">
          <CardContent className="p-6 space-y-6">
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "transition-all duration-300 ease-in-out",
                "border-2 border-dashed rounded-2xl p-8",
                isDragging ? "border-blue-400 bg-blue-50" : "border-gray-200 hover:border-gray-300",
                image && "border-none p-0"
              )}
            >
              {!image ? (
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center">
                      <Upload className="h-10 w-10 text-blue-500" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Drag and drop your image here
                    </p>
                    <p className="text-sm text-gray-500">
                      or
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Browse files
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
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute -right-2 -top-2 rounded-full z-10 bg-white shadow-md hover:bg-gray-100 transition-colors"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div
                      ref={polaroidRef}
                      className="relative bg-white p-4 shadow-xl rounded-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                    >
                      <div className="aspect-square relative overflow-hidden rounded-sm">
                        <Image
                          src={image}
                          alt="Uploaded image"
                          layout="fill"
                          objectFit="cover"
                          style={{ filter: selectedPreset.filter }}
                        />
                      </div>
                      <div className="h-16 flex items-center justify-center">
                        {caption && (
                          <p className={`text-center text-xl text-gray-800 mt-2 leading-tight ${indieFlower.className}`}>
                            {caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {image && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="caption" className="text-gray-700">Add a caption</Label>
                  <Input
                    id="caption"
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Write something memorable..."
                    maxLength={50}
                    className="backdrop-blur-sm bg-white/50 border-gray-200/50 focus:border-blue-300 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preset" className="text-gray-700">Choose a preset</Label>
                  <Select
                    value={selectedPreset.name}
                    onValueChange={(value) => setSelectedPreset(presets.find(p => p.name === value) || presets[0])}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a preset" />
                    </SelectTrigger>
                    <SelectContent>
                      {presets.map((preset) => (
                        <SelectItem key={preset.name} value={preset.name}>
                          {preset.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={downloadImage}
                  className="w-full bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 text-white transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    'Generating...'
                  ) : (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Polaroid
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

