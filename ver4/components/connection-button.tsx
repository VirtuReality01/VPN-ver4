"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ConnectionButtonProps {
  connected: boolean
  connecting: boolean
  onPress: () => void
}

export default function ConnectionButton({ connected, connecting, onPress }: ConnectionButtonProps) {
  return (
    <Button
      className={cn(
        "w-full md:w-40 h-12 text-base font-medium relative overflow-hidden",
        connected ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700",
      )}
      onClick={onPress}
      disabled={connecting}
    >
      {connecting ? (
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin" />
          <span>Connecting...</span>
        </div>
      ) : (
        <>
          <span>{connected ? "Disconnect" : "Connect"}</span>
          {connected && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          )}
        </>
      )}
    </Button>
  )
}

