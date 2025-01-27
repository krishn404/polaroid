'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { Loader2, AlertCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

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
        // Desktop styles
        "lg:h-[420px] lg:overflow-y-auto lg:overflow-x-hidden lg:px-2"
      )}
    >
      <div
        className={cn(
          "py-2 px-1",
          // Mobile: horizontal flex with smaller items
          "grid grid-flow-col auto-cols-[70px] gap-2",
          // Desktop: grid layout with more columns
          "lg:grid-flow-row lg:grid-cols-4 lg:auto-rows-[70px] lg:gap-3"
        )}
      >
        {stickers.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => onSelect(sticker.url, sticker.id, sticker.name)}
            className={cn(
              "relative w-full aspect-square rounded-lg overflow-hidden",
              "transition-all duration-300",
              "hover:ring-1 hover:ring-white/50",
              "bg-black/20"
            )}
          >
            <Image
              src={sticker.url}
              alt={sticker.name}
              fill
              className="object-contain p-1.5"
              unoptimized
              priority
            />
          </button>
        ))}
      </div>
    </div>
  );
} 