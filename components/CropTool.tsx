"use client"

import type React from "react"
import { useState, useCallback } from "react"
import Cropper, { Area } from "react-easy-crop"
import { Button } from "@/components/ui/button"
import { getCroppedImg } from "@/lib/cropImage"
import { ImageControls, MobileImageControls } from "./ImageControls"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface CropToolProps {
  image: string
  onCropFinish: (croppedImage: string) => void
  onRevert: () => void
  onClose: () => void
}

const CropTool: React.FC<CropToolProps> = ({ image, onCropFinish, onRevert, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  const handleReset = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
  }

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropImage = useCallback(async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation)
        onCropFinish(croppedImage)
      }
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, image, onCropFinish, rotation])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl mx-4 overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10"
      >
        <div className="relative h-[60vh] md:h-[70vh]">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            rotation={rotation}
            aspect={4 / 5}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
          />
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:block absolute top-4 left-1/2 -translate-x-1/2">
          <ImageControls
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(z + 0.1, 3))}
            onZoomOut={() => setZoom((z) => Math.max(z - 0.1, 1))}
            onRotate={handleRotate}
            onReset={handleReset}
          />
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden">
          <MobileImageControls
            zoom={zoom}
            onZoomIn={() => setZoom((z) => Math.min(z + 0.1, 3))}
            onZoomOut={() => setZoom((z) => Math.max(z - 0.1, 1))}
            onRotate={handleRotate}
            onReset={handleReset}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center gap-4 bg-black/40 backdrop-blur-xl border-t border-white/10">
          <Button
            variant="outline"
            onClick={onRevert}
            className="flex-1 bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
          >
            Revert
          </Button>
          <Button onClick={handleCropImage} className="flex-1 bg-white text-black hover:bg-white/90">
            Apply
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CropTool

