'use client'

import React, { useEffect, useRef } from 'react'

interface ColorGradingProps {
  image: string
  preset: string
  onProcessedImageChange: (processedImage: string) => void
}

const presets = {
  original: { brightness: 1, contrast: 1, saturation: 1, hue: 0, noise: 0, glare: 0 },
  vintage: { brightness: 1.1, contrast: 0.9, saturation: 1.2, hue: 15, noise: 0.1, glare: 0.3 },
  blackAndWhite: { brightness: 1, contrast: 1.2, saturation: 0, hue: 0, noise: 0.05, glare: 0 },
  warm: { brightness: 1.05, contrast: 1.05, saturation: 1.3, hue: 10, noise: 0, glare: 0 },
  cool: { brightness: 1, contrast: 1.05, saturation: 0.9, hue: -10, noise: 0, glare: 0 },
}

export const ImageColorGrading: React.FC<ColorGradingProps> = ({ image, preset, onProcessedImageChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = image
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      const presetValues = presets[preset as keyof typeof presets]

      for (let i = 0; i < data.length; i += 4) {
        // Apply brightness
        data[i] *= presetValues.brightness
        data[i + 1] *= presetValues.brightness
        data[i + 2] *= presetValues.brightness

        // Apply contrast
        for (let j = 0; j < 3; j++) {
          data[i + j] = ((data[i + j] / 255 - 0.5) * presetValues.contrast + 0.5) * 255
        }

        // Apply saturation
        const gray = 0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2]
        data[i] = gray * (1 - presetValues.saturation) + data[i] * presetValues.saturation
        data[i + 1] = gray * (1 - presetValues.saturation) + data[i + 1] * presetValues.saturation
        data[i + 2] = gray * (1 - presetValues.saturation) + data[i + 2] * presetValues.saturation

        // Apply hue rotation
        const hueRotation = presetValues.hue * Math.PI / 180
        const r = data[i], g = data[i + 1], b = data[i + 2]
        data[i] = (0.299 + 0.701 * Math.cos(hueRotation) + 0.168 * Math.sin(hueRotation)) * r
                + (0.587 - 0.587 * Math.cos(hueRotation) + 0.330 * Math.sin(hueRotation)) * g
                + (0.114 - 0.114 * Math.cos(hueRotation) - 0.497 * Math.sin(hueRotation)) * b
        data[i + 1] = (0.299 - 0.299 * Math.cos(hueRotation) - 0.328 * Math.sin(hueRotation)) * r
                    + (0.587 + 0.413 * Math.cos(hueRotation) + 0.035 * Math.sin(hueRotation)) * g
                    + (0.114 - 0.114 * Math.cos(hueRotation) + 0.292 * Math.sin(hueRotation)) * b
        data[i + 2] = (0.299 - 0.3 * Math.cos(hueRotation) + 1.25 * Math.sin(hueRotation)) * r
                    + (0.587 - 0.588 * Math.cos(hueRotation) - 1.05 * Math.sin(hueRotation)) * g
                    + (0.114 + 0.886 * Math.cos(hueRotation) - 0.203 * Math.sin(hueRotation)) * b

        // Apply noise
        if (presetValues.noise > 0) {
          const noise = (Math.random() - 0.5) * presetValues.noise * 255
          data[i] += noise
          data[i + 1] += noise
          data[i + 2] += noise
        }
      }

      ctx.putImageData(imageData, 0, 0)

      // Apply glare effect
      if (presetValues.glare > 0) {
        const glareIntensity = presetValues.glare * 0.7
        const glareSize = Math.min(canvas.width, canvas.height) * 0.4
        const glareX = Math.random() * canvas.width
        const glareY = Math.random() * canvas.height

        const gradient = ctx.createRadialGradient(glareX, glareY, 0, glareX, glareY, glareSize)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${glareIntensity})`)
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = 'source-over'
      }

      onProcessedImageChange(canvas.toDataURL())
    }
  }, [image, preset, onProcessedImageChange])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}

