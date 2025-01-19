'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Camera, FlipHorizontal2, ChevronLeft } from 'lucide-react'

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment')

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
    }
  }, [facingMode])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  const toggleCamera = async () => {
    stopCamera()
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user')
    await startCamera()
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0)
        const imageData = canvas.toDataURL('image/jpeg')
        onCapture(imageData)
        stopCamera()
        onClose()
      }
    }
  }

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      <div className="relative flex-1">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      
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
          onClick={capturePhoto}
        >
          <Camera className="h-6 w-6 text-white" />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full bg-white/10 border-white/20 hover:bg-white/20"
          onClick={toggleCamera}
        >
          <FlipHorizontal2 className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
} 