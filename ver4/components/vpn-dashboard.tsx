"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Settings, Server, Lock, Info, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import ConnectionButton from "./connection-button"
import StatusCard from "./status-card"
import OjasStatusIndicator from "./ojas-status-indicator"
import BrowserCheck from "./browser-check"
import { cn } from "@/lib/utils"
import { useVpnStore } from "@/lib/vpn-service"
import { useToast } from "@/hooks/use-toast"

export default function VpnDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  const {
    connected,
    connecting,
    selectedServer,
    publicIp,
    vpnIp,
    ojasLayers,
    attackDetected,
    error,
    setSelectedServer,
    connect,
    disconnect,
    fetchPublicIp,
  } = useVpnStore()

  useEffect(() => {
    fetchPublicIp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (error) {
      toast({
        title: "Connection Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  useEffect(() => {
    if (attackDetected) {
      toast({
        title: "Attack Detected",
        description: "OJAS has detected a potential attack and is adding additional encryption layers for protection.",
        variant: "warning",
      })
    }
  }, [attackDetected, toast])

  const toggleConnection = async () => {
    if (connected) {
      disconnect()
    } else {
      await connect()
    }
  }

  const navigateToServerSelection = () => {
    router.push("/server-selection")
  }

  const navigateToEncryptionDetails = () => {
    router.push("/encryption-details")
  }

  const navigateToOjasInfo = () => {
    router.push("/ojas-info")
  }

  const navigateToSettings = () => {
    router.push("/settings")
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <BrowserCheck />

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-transform",
                  attackDetected ? "animate-pulse" : "",
                  connected ? "bg-emerald-500/20" : "bg-slate-700",
                )}
              >
                <Shield
                  className={cn("h-8 w-8 transition-colors", connected ? "text-emerald-500" : "text-slate-400")}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {connecting ? "Connecting..." : connected ? "Protected" : "Not Protected"}
                </h2>
                <p className="text-slate-400">
                  {connected ? `Connected to ${selectedServer.name}` : "Your connection is not secure"}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <ConnectionButton connected={connected} connecting={connecting} onPress={toggleConnection} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard
          title="Connection Details"
          icon={<Server className="h-5 w-5 text-blue-500" />}
          onPress={navigateToServerSelection}
          disabled={connected}
        >
          <div className="mb-4">
            <p className="text-base font-medium flex items-center gap-2">
              <span>{selectedServer.flag}</span> {selectedServer.name}
            </p>
            <p className="text-sm text-slate-400">{selectedServer.location}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Public IP:</span>
              <code className="bg-slate-900 px-2 py-1 rounded text-xs">{publicIp || "Loading..."}</code>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">VPN IP:</span>
              <code className="bg-slate-900 px-2 py-1 rounded text-xs">{connected ? vpnIp : "Not connected"}</code>
            </div>
          </div>
        </StatusCard>

        <StatusCard
          title="OJAS Encryption"
          icon={<Lock className="h-5 w-5 text-emerald-500" />}
          onPress={navigateToEncryptionDetails}
          rightIcon={<Info className="h-4 w-4 text-slate-400" />}
          onRightIconPress={navigateToOjasInfo}
        >
          <OjasStatusIndicator active={connected} layers={ojasLayers} attackDetected={attackDetected} />
        </StatusCard>
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2 mt-4 w-full md:w-auto md:self-center"
        onClick={navigateToSettings}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Button>

      {/* Browser compatibility info */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-slate-300 mb-2">Important Information</h3>
            <p className="text-xs text-slate-400 mb-2">
              This web-based VPN tunnels your traffic through our secure proxy servers. For optimal security:
            </p>
            <ul className="text-xs text-slate-400 list-disc pl-4 space-y-1">
              <li>Allow this site to use cookies and local storage</li>
              <li>Some browsers may require additional permissions for WebRTC protection</li>
              <li>For complete device-level protection, consider our desktop application</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

