"use client"
import React from 'react'
import { Range, getTrackBackground } from 'react-range'

interface Adjustment {
  label: string
  min: number
  max: number
  step: number
  value: number
}

interface TweaksAdjustmentsProps {
  adjustments: Record<string, Adjustment>
  onChange: (key: string, value: number) => void
}

const TweaksAdjustments: React.FC<TweaksAdjustmentsProps> = ({ adjustments, onChange }) => {
  return (
    <div className="space-y-6">
      {Object.entries(adjustments).map(([key, adjustment]) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between">
            <label className="text-white/60 text-xs capitalize">{adjustment.label}</label>
            <span className="text-white/60 text-xs">{adjustment.value.toFixed(2)}</span>
          </div>
          <Range
            values={[adjustment.value]}
            step={adjustment.step}
            min={adjustment.min}
            max={adjustment.max}
            onChange={(values) => onChange(key, values[0])}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="h-7 flex w-full"
              >
                <div
                  ref={props.ref}
                  className="h-1 w-full rounded-full self-center"
                  style={{
                    background: getTrackBackground({
                      values: [adjustment.value],
                      colors: ["rgba(255, 255, 255, 0.95)", "rgba(255, 255, 255, 0.3)"],
                      min: adjustment.min,
                      max: adjustment.max,
                    }),
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props, index }) => (
              <div
                {...props}
                key={index}
                className="h-4 w-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              />
            )}
          />
        </div>
      ))}
    </div>
  )
}

export default TweaksAdjustments

