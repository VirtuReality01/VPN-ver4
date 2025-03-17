// Helper functions to register and communicate with the service worker

// Register the service worker
export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/service-worker.js")
      console.log("Service worker registered:", registration)
      return registration
    } catch (error) {
      console.error("Service worker registration failed:", error)
      return null
    }
  }
  return null
}

// Update the service worker with VPN status
export function updateServiceWorkerVpnStatus(connected: boolean, server: any, ojasLayers: number) {
  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: "VPN_STATUS",
      connected,
      server,
      ojasLayers,
    })
  }
}

// Check if the service worker is active
export async function isServiceWorkerActive() {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration()
    return !!registration?.active
  }
  return false
}

