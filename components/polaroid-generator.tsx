import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface Preset {
  name: string;
  image: string;
  adjustments: {
    brightness: number;
    saturation: number;
  };
}

const PolaroidGenerator: React.FC = () => {
  const presets = [
    { name: 'Preset 1', image: '/path/to/preset1.jpg', adjustments: { brightness: 1, saturation: 1 } },
    { name: 'Preset 2', image: '/path/to/preset2.jpg', adjustments: { brightness: 1, saturation: 1 } },
    { name: 'Preset 3', image: '/path/to/preset3.jpg', adjustments: { brightness: 1, saturation: 1 } },
    { name: 'Preset 4', image: '/path/to/preset4.jpg', adjustments: { brightness: 1, saturation: 1 } },
  ];
  const [selectedPreset, setSelectedPreset] = useState(presets[0]);
  const [image, setImage] = useState('/path/to/default.jpg');

  const handlePresetChange = (preset: Preset) => {
    setSelectedPreset(preset);
    setImage(preset.image);
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "py-2 px-1",
          // Mobile: horizontal flex
          "grid grid-flow-col auto-cols-[60px] gap-1.5",
          // Desktop: grid layout
          "lg:grid-flow-row lg:grid-cols-5 lg:auto-rows-[60px] lg:gap-1.5"
        )}
      >
        {presets.map((preset) => (
          <PresetThumbnail
            key={preset.name}
            preset={preset}
            image={image}
            isSelected={selectedPreset.name === preset.name}
            onClick={() => handlePresetChange(preset)}
          />
        ))}
      </div>
    </div>
  );
};

const PresetThumbnail: React.FC<{
  preset: Preset
  image: string
  isSelected: boolean
  onClick: () => void
}> = ({ preset, image, isSelected, onClick }) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const img = new (window.Image as { new(): HTMLImageElement })()
    img.crossOrigin = "anonymous"
    img.src = image
    img.onload = function() {
      canvas.width = 60  // Reduced from 80
      canvas.height = 60 // Reduced from 80
      ctx.drawImage(img, 0, 0, 60, 60)

      const imageData = ctx.getImageData(0, 0, 60, 60)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Apply preset adjustments (simplified version)
        data[i] *= preset.adjustments.brightness // Red
        data[i + 1] *= preset.adjustments.brightness // Green
        data[i + 2] *= preset.adjustments.brightness // Blue

        // Apply saturation
        const gray = 0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
        data[i] = gray * (1 - preset.adjustments.saturation) + data[i] * preset.adjustments.saturation
        data[i + 1] = gray * (1 - preset.adjustments.saturation) + data[i + 1] * preset.adjustments.saturation
        data[i + 2] = gray * (1 - preset.adjustments.saturation) + data[i + 2] * preset.adjustments.saturation
      }

      ctx.putImageData(imageData, 0, 0)
      setPreviewImage(canvas.toDataURL())
    }
  }, [image, preset])

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative w-full aspect-square rounded-md overflow-hidden",
        "transition-all duration-300",
        "bg-black/20 backdrop-blur-sm",
        isSelected ? "ring-1 ring-white" : "hover:ring-[0.5px] hover:ring-white/50",
      )}
    >
      {previewImage ? (
        <Image src={previewImage} alt={preset.name} fill className="object-cover" priority />
      ) : (
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      )}
      <div className="absolute inset-x-0 bottom-0 bg-black/50 p-0.5">
        <span className="text-[8px] text-white/90 font-medium block truncate px-0.5">{preset.name}</span>
      </div>
    </button>
  )
}

export default PolaroidGenerator; 