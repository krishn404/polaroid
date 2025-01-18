import { Camera, Sunset, Moon, Sun, Sparkles, Cloud, Rainbow, Stars, Zap, type LucideIcon, Droplet, Flower2, Mountain, Leaf, Snowflake } from 'lucide-react'

export interface Adjustments {
  brightness: number
  contrast: number
  saturation: number
  hue: number
  noise: number
  glare: number
}

export interface Preset {
  name: string
  label: string
  icon: LucideIcon
  adjustments: Adjustments
}

export const presets: Preset[] = [
  { 
    name: 'original', 
    label: 'Natural', 
    icon: Camera,
    adjustments: { brightness: 1, contrast: 1, saturation: 1, hue: 0, noise: 0, glare: 0 }
  },
  { 
    name: 'vintage', 
    label: 'Retro', 
    icon: Sunset,
    adjustments: { brightness: 1.1, contrast: 0.9, saturation: 1.2, hue: 15, noise: 0.1, glare: 0.3 }
  },
  { 
    name: 'blackAndWhite', 
    label: 'Mono', 
    icon: Moon,
    adjustments: { brightness: 1, contrast: 1.2, saturation: 0, hue: 0, noise: 0.05, glare: 0 }
  },
  { 
    name: 'warm', 
    label: 'Sunny', 
    icon: Sun,
    adjustments: { brightness: 1.05, contrast: 1.05, saturation: 1.3, hue: 10, noise: 0, glare: 0 }
  },
  { 
    name: 'cool', 
    label: 'Fresh', 
    icon: Sparkles,
    adjustments: { brightness: 1, contrast: 1.05, saturation: 0.9, hue: -10, noise: 0, glare: 0 }
  },
  { 
    name: 'dreamy', 
    label: 'Dreamy', 
    icon: Cloud,
    adjustments: { brightness: 1.1, contrast: 0.85, saturation: 0.9, hue: 5, noise: 0.15, glare: 0.4 }
  },
  { 
    name: 'vibrant', 
    label: 'Vibrant', 
    icon: Rainbow,
    adjustments: { brightness: 1.1, contrast: 1.2, saturation: 1.4, hue: 0, noise: 0, glare: 0.1 }
  },
  { 
    name: 'night', 
    label: 'Night', 
    icon: Stars,
    adjustments: { brightness: 0.9, contrast: 1.1, saturation: 0.8, hue: -15, noise: 0.2, glare: 0.1 }
  },
  { 
    name: 'dramatic', 
    label: 'Dramatic', 
    icon: Zap,
    adjustments: { brightness: 1.05, contrast: 1.3, saturation: 0.9, hue: 0, noise: 0.1, glare: 0.2 }
  },
  { 
    name: 'sepia', 
    label: 'Sepia', 
    icon: Droplet,
    adjustments: { brightness: 1.1, contrast: 1.1, saturation: 0.8, hue: 30, noise: 0.05, glare: 0.1 }
  },
  { 
    name: 'spring', 
    label: 'Spring', 
    icon: Flower2,
    adjustments: { brightness: 1.05, contrast: 1, saturation: 1.2, hue: -10, noise: 0, glare: 0.2 }
  },
  { 
    name: 'autumn', 
    label: 'Autumn', 
    icon: Leaf,
    adjustments: { brightness: 1, contrast: 1.1, saturation: 1.3, hue: 20, noise: 0.05, glare: 0.1 }
  },
  { 
    name: 'winter', 
    label: 'Winter', 
    icon: Snowflake,
    adjustments: { brightness: 1.1, contrast: 0.9, saturation: 0.7, hue: -15, noise: 0.1, glare: 0.3 }
  },
  { 
    name: 'hdr', 
    label: 'HDR', 
    icon: Mountain,
    adjustments: { brightness: 1.1, contrast: 1.3, saturation: 1.2, hue: 0, noise: 0, glare: 0.2 }
  }
]

