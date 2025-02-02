import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface DraggableStickerProps {
  url: string
  name: string
  onRemove?: () => void
}

export default function DraggableSticker({ url, name, onRemove }: DraggableStickerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const stickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const sticker = stickerRef.current
    if (!container || !sticker) return

    const containerRect = container.getBoundingClientRect()
    const stickerRect = sticker.getBoundingClientRect()

    const maxX = containerRect.width - stickerRect.width
    const maxY = containerRect.height - stickerRect.height

    setPosition({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    })
  }, [])

  const handleDrag = (event: MouseEvent | TouchEvent, info: { point: { x: number; y: number } }) => {
    const container = containerRef.current
    const sticker = stickerRef.current
    if (!container || !sticker) return

    const containerRect = container.getBoundingClientRect()
    const stickerRect = sticker.getBoundingClientRect()

    const maxX = containerRect.width - stickerRect.width
    const maxY = containerRect.height - stickerRect.height

    setPosition({
      x: Math.max(0, Math.min(info.point.x - containerRect.left, maxX)),
      y: Math.max(0, Math.min(info.point.y - containerRect.top, maxY)),
    })
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <motion.div
        ref={stickerRef}
        drag
        dragMomentum={false}
        dragElastic={0}
        onDrag={handleDrag}
        style={{ x: position.x, y: position.y }}
        className="absolute w-16 h-16 cursor-move"
        whileHover={{ scale: 1.1 }}
        whileDrag={{ scale: 1.2 }}
        onDoubleClick={onRemove}
        data-sticker
      >
        <Image
          src={url || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain pointer-events-none"
          draggable={false}
        />
      </motion.div>
    </div>
  )
}

