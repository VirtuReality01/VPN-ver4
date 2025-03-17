"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface OjasStatusIndicatorProps {
  active: boolean
  layers: number
  attackDetected: boolean
}

export default function OjasStatusIndicator({ active, layers, attackDetected }: OjasStatusIndicatorProps) {
  const [pulsing, setPulsing] = useState(false)

  useEffect(() => {
    if (attackDetected) {
      setPulsing(true)
    } else {
      setPulsing(false)
    }
  }, [attackDetected])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-slate-400">Status:</span>
        <div
          className={cn(
            "px-2 py-1 rounded text-xs font-medium",
            active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400",
          )}
        >
          {active ? "ACTIVE" : "INACTIVE"}
        </div>
      </div>

      {active && (
        <>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Active Layers:</span>
            <span className="text-sm font-medium">{layers}</span>
          </div>

          <div className={cn("flex justify-between mb-3", pulsing && "animate-pulse")}>
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-3 w-3 rounded-full",
                  index < layers
                    ? attackDetected && index === layers - 1
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                    : "bg-slate-700",
                )}
              />
            ))}
          </div>

          {attackDetected && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded p-2 mt-2">
              <p className="text-amber-500 text-xs text-center font-medium">Attack detected! Adding layers...</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

