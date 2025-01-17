import { Frame, Palette, Sliders, Sticker, Type } from 'lucide-react'

export const tools = [
  { id: 'frames', icon: Frame, label: 'Frames' },
  { id: 'filters', icon: Palette, label: 'Filters' },
  { id: 'tweaks', icon: Sliders, label: 'Tweaks' },
  { id: 'stickers', icon: Sticker, label: 'Stickers' },
  { id: 'caption', icon: Type, label: 'Caption' }
] as const

export type ToolId = typeof tools[number]['id'] 