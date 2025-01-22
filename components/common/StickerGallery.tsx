'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Loader2, AlertCircle } from 'lucide-react'

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

  const fetchStickers = async () => {
    try {
      const response = await fetch('/api/stickers');
      if (!response.ok) throw new Error('Failed to fetch stickers');
      
      const data = await response.json();
      setStickers(prev => [...prev, ...data.data.uploads]);
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

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-3">
        {stickers.map((sticker) => (
          <Button
            key={sticker.id}
            variant="outline"
            className="p-0 h-16 aspect-square relative overflow-hidden bg-black/20 border-white/10 hover:border-white/20"
            onClick={() => onSelect(sticker.url, sticker.id, sticker.name)}
          >
            <Image
              src={sticker.url}
              alt={sticker.name}
              fill
              className="object-contain p-2"
              unoptimized
              priority
            />
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-white/60" />
        </div>
      )}
    </div>
  )
} 