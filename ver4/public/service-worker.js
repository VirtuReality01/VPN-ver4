// This is a service worker that will intercept network requests and route them through our proxy
// when the VPN is connected

self.addEventListener("install", (event) => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim())
})

// Listen for messages from the main application
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "VPN_STATUS") {
    // Store the VPN status in the service worker
    self.vpnConnected = event.data.connected
    self.selectedServer = event.data.server
    self.ojasLayers = event.data.ojasLayers
  }
})

// Intercept fetch requests
self.addEventListener("fetch", (event) => {
  // Only intercept if VPN is connected
  if (!self.vpnConnected) {
    return
  }

  const url = new URL(event.request.url)

  // Don't intercept requests to our own domain
  if (url.origin === self.location.origin) {
    return
  }

  // Don't intercept requests to the proxy server
  if (url.hostname.includes("proxy.securevpn.example.com")) {
    return
  }

  // Handle the fetch event by proxying through our server
  event.respondWith(
    (async () => {
      try {
        // Clone the original request
        const originalRequest = event.request.clone()

        // Create a new request to our proxy endpoint
        const proxyRequest = {
          url: originalRequest.url,
          method: originalRequest.method,
          headers: {},
          body: null,
        }

        // Copy headers from the original request
        for (const [key, value] of originalRequest.headers.entries()) {
          proxyRequest.headers[key] = value
        }

        // Add OJAS headers
        proxyRequest.headers["X-OJAS-Layers"] = self.ojasLayers || "1"
        proxyRequest.headers["X-Selected-Server"] = self.selectedServer?.id || "us1"

        // If the request has a body, read and include it
        if (["POST", "PUT", "PATCH"].includes(originalRequest.method)) {
          proxyRequest.body = await originalRequest.json()
        }

        // Send the request to our proxy endpoint
        const response = await fetch("/api/tunnel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-OJAS-Layers": self.ojasLayers || "1",
          },
          body: JSON.stringify(proxyRequest),
        })

        return response
      } catch (error) {
        console.error("Service worker proxy error:", error)
        // Fall back to the original request if proxying fails
        return fetch(event.request)
      }
    })(),
  )
})

