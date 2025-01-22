'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface DraggableStickerProps {
  url: string;
  name: string;
  onRemove?: () => void;
}

export default function DraggableSticker({ url, name, onRemove }: DraggableStickerProps) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="absolute w-16 h-16 cursor-move"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 1.2 }}
      onDoubleClick={onRemove}
    >
      <Image
        src={url}
        alt={name}
        fill
        className="object-contain pointer-events-none"
        draggable={false}
      />
    </motion.div>
  )
} 