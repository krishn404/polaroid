'use client'

import React from 'react'
import html2canvas from 'html2canvas'
import { Button } from "@/components/ui/button"
import { Share2 } from 'lucide-react'

interface SharePolaroidProps {
  polaroidRef: React.RefObject<HTMLDivElement>
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const SharePolaroid: React.FC<SharePolaroidProps> = ({ 
  polaroidRef, 
  isLoading, 
  setIsLoading 
}) => {
  const shareImage = async () => {
    if (!polaroidRef.current) return
    
    setIsLoading(true)
    try {
      // Convert the polaroid div to canvas
      const canvas = await html2canvas(polaroidRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: window.devicePixelRatio
      })
      
      // Convert canvas to data URL first
      const dataUrl = canvas.toDataURL('image/png')
      
      // For mobile devices, try using the Web Share API
      if (navigator.share) {
        // Convert data URL to blob
        const response = await fetch(dataUrl)
        const blob = await response.blob()
        const file = new File([blob], 'polaroid.png', { type: 'image/png' })
        
        // Share data
        const shareData = {
          title: 'Check out my Polaroid!',
          text: 'Hey check this polaroid made in polaroidpix.vercel.app',
          files: [file],
        }
        
        // Check if Web Share API is supported
        if (navigator.canShare && navigator.canShare(shareData)) {
          await navigator.share(shareData)
        } else {
          // Fallback for browsers that don't support sharing files
          const shareData = {
            title: 'Check out my Polaroid!',
            text: 'Hey check this polaroid made in polaroidpix.vercel.app',
            url: 'https://polaroidpix.vercel.app',
          }
          await navigator.share(shareData)
        }
      }
    } catch (error) {
      console.error('Error sharing:', error)
      // Handle error (you might want to show a toast notification here)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Button
      variant="outline"
      className="border-white/20 bg-black/20 backdrop-blur-xl text-white/80 hover:bg-white/10 rounded-full"
      onClick={shareImage}
      disabled={isLoading}
    >
      <Share2 className="w-4 h-4" />
    </Button>
  )
}

export default SharePolaroid