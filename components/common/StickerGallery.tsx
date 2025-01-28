'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Loader2, AlertCircle } from 'lucide-react'
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface StickerGalleryProps {
  onSelect: (url: string, id: string, name: string) => void;
}

interface Sticker {
  id: string;
  name: string;
  url: string;
}

export default function StickerGallery({ onSelect }: StickerGalleryProps) {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchStickers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/stickers');
      if (!response.ok) throw new Error('Failed to fetch stickers');
      
      const data = await response.json();
      setStickers(data.data.uploads);
      setError(null);
    } catch (err) {
      setError('Failed to load stickers');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStickers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-6 w-6 animate-spin text-white/60" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
        <AlertCircle className="h-4 w-4" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "relative",
        // Mobile styles
        "h-[100px] overflow-x-auto scrollbar-hide",
        // Desktop styles - enhanced scrollbar
        "lg:h-auto lg:overflow-visible",
        "lg:scrollbar-thin lg:scrollbar-track-transparent",
        "lg:scrollbar-thumb-white/[0.08] lg:hover:scrollbar-thumb-white/[0.15]"
      )}
    >
      <div
        className={cn(
          "py-2 px-1",
          // Mobile: horizontal grid
          "grid grid-flow-col auto-cols-[70px] gap-2",
          // Desktop: wider grid with more columns
          "lg:grid-flow-row lg:grid-cols-6 xl:grid-cols-8",
          "lg:gap-4 lg:p-2",
          // Enhanced scrollbar padding
          "lg:pr-3"
        )}
      >
        {stickers.map((sticker, index) => (
          <motion.button
            key={sticker.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.05,
              ease: "easeOut"
            }}
            onClick={() => onSelect(sticker.url, sticker.id, sticker.name)}
            className={cn(
              "relative w-full aspect-square rounded-lg overflow-hidden",
              "transition-all duration-300",
              "bg-white/[0.02] backdrop-blur-sm",
              // Desktop enhancements
              "lg:hover:bg-white/[0.06]",
              "lg:ring-1 lg:ring-white/10",
              "lg:hover:ring-white/20",
              "lg:shadow-lg"
            )}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={sticker.url}
              alt={sticker.name}
              fill
              className={cn(
                "object-contain p-1.5",
                "transition-transform duration-300",
                "lg:p-2 lg:hover:scale-110"
              )}
              unoptimized
              priority
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
} 