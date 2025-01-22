'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Camera, FlipHorizontal2, ChevronLeft } from 'lucide-react'
import { cn } from "@/lib/utils"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')
  const [isReady, setIsReady] = useState(false)

  // Initialize camera
  useEffect(() => {
    let stream: MediaStream | null = null

    async function setupCamera() {
      try {
        // Stop any existing stream
        if (videoRef.current?.srcObject) {
          const oldStream = videoRef.current.srcObject as MediaStream
          oldStream.getTracks().forEach(track => track.stop())
        }

        // Start new stream
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            if (videoRef.current) {
              videoRef.current.play()
              setIsReady(true)
            }
          }
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
        setIsReady(false)
      }
    }

    setupCamera()

    // Cleanup
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [facingMode])

  const takePhoto = () => {
    if (!videoRef.current || !isReady) return

    const canvas = document.createElement('canvas')
    const video = videoRef.current

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw the current video frame
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Flip horizontally if using front camera
    if (facingMode === 'user') {
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0)

    // Convert to JPEG
    const imageData = canvas.toDataURL('image/jpeg', 0.9)

    // Stop camera stream
    const stream = video.srcObject as MediaStream
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }

    onCapture(imageData)
    onClose()
  }

  const switchCamera = () => {
    setFacingMode(current => current === 'user' ? 'environment' : 'user')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full">
        {/* Camera Preview */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={cn(
            "w-full h-full object-cover",
            facingMode === 'user' && "scale-x-[-1]"
          )}
        />

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
            onClick={onClose}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
            onClick={takePhoto}
            disabled={!isReady}
          >
            <Camera className="h-6 w-6 text-white" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-14 w-14 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
            onClick={switchCamera}
            disabled={!isReady}
          >
            <FlipHorizontal2 className="h-6 w-6 text-white" />
          </Button>
        </div>
      </div>
    </div>
  )
} 