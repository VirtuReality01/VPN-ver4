"use client"

import { useEffect } from "react"
import { useVpnStore } from "@/lib/vpn-service"
import { registerServiceWorker, updateServiceWorkerVpnStatus } from "@/lib/service-worker"

// This hook handles the side effects of VPN connection status changes
export function useVpnEffect() {
  const { connected, selectedServer, ojasLayers } = useVpnStore()

  // Register service worker and update it when VPN status changes
  useEffect(() => {
    let registration: ServiceWorkerRegistration | null = null

    const setup = async () => {
      registration = await registerServiceWorker()
      if (registration) {
        updateServiceWorkerVpnStatus(connected, selectedServer, ojasLayers)
      }
    }

    setup()

    return () => {
      if (registration) {
        updateServiceWorkerVpnStatus(false, null, 1)
      }
    }
  }, [connected, selectedServer, ojasLayers])

  // Apply WebRTC protection when connected
  useEffect(() => {
    if (connected) {
      // For Chrome
      if (typeof window !== "undefined" && (window as any).chrome && (window as any).chrome.webrtc) {
        ;(window as any).chrome.webrtc.setPrivacyOptions(["default_public_interface_only"])
      }
    }
  }, [connected])

  return null
}

