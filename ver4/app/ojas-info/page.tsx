"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"

export default function OjasInfo() {
  const router = useRouter()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Animation for the layers visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let layerCount = 1
    let increasing = true
    let frameCount = 0

    const render = () => {
      frameCount++

      // Change layer count every 60 frames (about 1 second)
      if (frameCount % 60 === 0) {
        if (increasing) {
          layerCount++
          if (layerCount >= 7) {
            increasing = false
          }
        } else {
          layerCount--
          if (layerCount <= 1) {
            increasing = true
          }
        }
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw layers
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw layers from outside in
      for (let i = 7; i >= 1; i--) {
        const radius = 20 + i * 15
        const alpha = i <= layerCount ? 0.7 : 0.2

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fillStyle =
          i <= layerCount
            ? `rgba(245, 158, 11, ${alpha})` // Amber for active
            : `rgba(100, 116, 139, ${alpha})` // Slate for inactive
        ctx.fill()
      }

      // Draw device icon in center
      ctx.beginPath()
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2)
      ctx.fillStyle = "#0f172a"
      ctx.fill()

      // Draw lock icon
      ctx.fillStyle = "#ffffff"
      ctx.font = "20px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText("🔒", centerX, centerY)

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-slate-300 hover:text-white"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-amber-500" />
              <span>OJAS Encryption</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-medium text-amber-500 mb-2">Adaptive Multi-Layer Protection</h3>

            <p className="text-sm text-slate-400 mb-6">
              OJAS (Omnidirectional Juxtaposed Adaptive Security) is our proprietary encryption technology that provides
              unparalleled protection for your data on public WiFi networks.
            </p>

            <div className="flex flex-col items-center mb-8">
              <h4 className="text-sm font-medium mb-4">Dynamic Layer Protection</h4>

              <div className="relative w-full max-w-xs aspect-square mb-4">
                <canvas ref={canvasRef} className="w-full h-full" width={300} height={300} />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Active Layers:</span>
                <span className="text-amber-500 font-medium text-animation" id="layer-count">
                  1-7
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-base font-medium">Key Features</h4>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="text-amber-500" size={18} />
                  <h5 className="font-medium">Threat Detection</h5>
                </div>
                <p className="text-sm text-slate-400">
                  OJAS continuously monitors your connection for suspicious activities and potential attacks. When a
                  threat is detected, it immediately responds by adding additional encryption layers.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="text-amber-500" size={18} />
                  <h5 className="font-medium">Adaptive Response</h5>
                </div>
                <p className="text-sm text-slate-400">
                  Like a magnet attracting protection, OJAS responds to attacks by adding up to 7 additional encryption
                  layers, each more sophisticated than the last, creating a virtually impenetrable shield.
                </p>
              </div>

              <div className="bg-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-amber-500" size={18} />
                  <h5 className="font-medium">Self-Reinforcing</h5>
                </div>
                <p className="text-sm text-slate-400">
                  The more an attacker tries to breach your connection, the stronger OJAS becomes. Each attack attempt
                  is analyzed and used to strengthen future protection, making your VPN smarter over time.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-medium mb-3">Technical Details</h4>

              <p className="text-sm text-slate-400 mb-3">
                OJAS uses a combination of symmetric and asymmetric encryption algorithms, arranged in a proprietary
                layered structure. Each layer employs different cryptographic primitives, ensuring that even if one
                layer is compromised, the others remain secure.
              </p>

              <p className="text-sm text-slate-400 mb-3">
                The system employs advanced heuristics to detect potential attacks, including pattern recognition,
                anomaly detection, and behavioral analysis. When an attack is detected, OJAS dynamically generates new
                encryption keys and adds additional encryption layers.
              </p>

              <p className="text-sm text-slate-400">
                All of this happens automatically and transparently, ensuring your data remains protected without any
                action required on your part.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

