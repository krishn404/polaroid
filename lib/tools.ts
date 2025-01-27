import { Palette, Sliders, Sticker, Type, Crop, PaintBucket } from 'lucide-react'

export const tools = [
  // { id: 'frames', icon: Frame, label: 'Frames' },
  { id: 'crop', icon: Crop, label: 'Crop' },
  { id: 'filters', icon: Palette, label: 'Filters' },
  { id: 'tweaks', icon: Sliders, label: 'Tweaks' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
  { id: 'caption', icon: Type, label: 'Caption' },
  { id: 'bgcolor', icon: PaintBucket, label: 'Background' }
] as const

export type ToolId = typeof tools[number]['id'] 