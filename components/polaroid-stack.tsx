"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, TargetAndTransition, Target } from 'framer-motion'
import Image from 'next/image'
import { Gloria_Hallelujah } from 'next/font/google'
import PolaroidGenerator from './polaroid-generator'

const polaroidData = [
  { src: "/Polaroid1.jpg", caption: "Let's Doodle" },
  { src: "/Polaroid2.jpg", caption: "City nights" },
  { src: "/Polaroid3.jpg", caption: "Perfect Bloom" },
  { src: "/Polaroid4.jpg", caption: "Sunset session" },
  { src: "/Polaroid5.jpg", caption: "Street style" },
  { src: "/Polaroid6.jpg", caption: "Just cruising" }
]

// Define a new type that includes initial
type CustomAnimateProps = {
  initial: Target;
  animate: Target;
  transition: TargetAndTransition['transition'];
};

const gloriaHallelujah = Gloria_Hallelujah({ weight: '400', subsets: ['latin'] });

const PolaroidFrame = ({ src, caption, style, animate }: { src: string, caption: string, style: React.CSSProperties, animate: CustomAnimateProps }) => (
  <motion.div
    className="relative bg-white p-4 shadow-lg ml-[45%]"
    style={{
      width: '256px',
      ...style
    }}
    initial={animate.initial}
    animate={animate.animate}
    transition={animate.transition}
  >
    <div className="relative w-full" style={{ paddingBottom: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <Image
        src={src}
        alt={caption}
        fill
        unoptimized
        className="object-cover"
        sizes="256px"
        style={{ objectPosition: 'center', width: '100%', height: '100%' }}
      />
    </div>
    <div className="text-center mt-4 mb-2">
      <p className={`${gloriaHallelujah.className} text-lg text-gray-800`}>{caption}</p>
    </div>
  </motion.div>
)

export default function PolaroidStack() {
  const [stage, setStage] = useState(0)
  const [visiblePolaroids, setVisiblePolaroids] = useState(0)

  useEffect(() => {
    const polaroidInterval = setInterval(() => {
      setVisiblePolaroids((prev) => {
        if (prev < polaroidData.length - 1) {
          return prev + 1
        } else {
          clearInterval(polaroidInterval)
          setTimeout(() => setStage(1), 2000)
          return prev
        }
      })
    }, 1500)

    return () => clearInterval(polaroidInterval)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            key="polaroid-stack"
            className="absolute inset-0"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center justify-center h-full">
              <div className="relative w-64">
                {polaroidData.map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute left-0 right-0"
                    style={{ 
                      zIndex: index,
                      transformOrigin: '50% 50%',
                      transform: `translate(-50%, -50%) rotate(${-8 + Math.random() * 16}deg)`
                    }}
                  >
                    <PolaroidFrame
                      src={item.src}
                      caption={item.caption}
                      style={{
                        transform: `rotate(${-8 + Math.random() * 16}deg)`
                      }}
                      animate={{
                        initial: { 
                          y: '100%', 
                          opacity: 0, 
                          rotateZ: -8 + Math.random() * 16
                        },
                        animate: index <= visiblePolaroids ? {
                          y: `${-(visiblePolaroids - index) * 20}px`,
                          opacity: 1,
                          rotateZ: -8 + Math.random() * 16
                        } : {},
                        transition: {
                          type: 'spring',
                          stiffness: 150,
                          damping: 25
                        }
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: stage === 1 ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {stage === 1 && <PolaroidGenerator />}
      </motion.div>
    </div>
  )
}