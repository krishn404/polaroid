import React from 'react'

interface BlurredBackgroundProps {
  image: string
}

const BlurredBackground: React.FC<BlurredBackgroundProps> = ({ image }) => {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(20px) brightness(0.7)',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30" />
    </div>
  )
}

export default BlurredBackground

