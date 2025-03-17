import { create } from "zustand"

// Define the server regions
const VPN_SERVERS = [
  {
    id: "us1",
    name: "United States",
    location: "New York",
    flag: "🇺🇸",
    endpoint: "us-east.proxy.securevpn.example.com",
  },
  {
    id: "nl1",
    name: "Netherlands",
    location: "Amsterdam",
    flag: "🇳🇱",
    endpoint: "eu-west.proxy.securevpn.example.com",
  },
  { id: "jp1", name: "Japan", location: "Tokyo", flag: "🇯🇵", endpoint: "ap-northeast.proxy.securevpn.example.com" },
  {
    id: "sg1",
    name: "Singapore",
    location: "Singapore",
    flag: "🇸🇬",
    endpoint: "ap-southeast.proxy.securevpn.example.com",
  },
  {
    id: "uk1",
    name: "United Kingdom",
    location: "London",
    flag: "🇬🇧",
    endpoint: "eu-west-2.proxy.securevpn.example.com",
  },
  { id: "de1", name: "Germany", location: "Frankfurt", flag: "🇩🇪", endpoint: "eu-central.proxy.securevpn.example.com" },
  { id: "ca1", name: "Canada", location: "Toronto", flag: "🇨🇦", endpoint: "ca-central.proxy.securevpn.example.com" },
  {
    id: "au1",
    name: "Australia",
    location: "Sydney",
    flag: "🇦🇺",
    endpoint: "ap-southeast-2.proxy.securevpn.example.com",
  },
]

// The proxy server URL (would be your deployed proxy server)
const PROXY_SERVER = process.env.NEXT_PUBLIC_PROXY_SERVER || "https://proxy.securevpn.example.com"

// WebRTC leak prevention
export function preventWebRTCLeak() {
  if (typeof window !== "undefined") {
    // For Chrome
    if ((window as any).chrome && (window as any).chrome.webrtc) {
      ;(window as any).chrome.webrtc.setPrivacyOptions(["default_public_interface_only"])
    }

    // For Firefox (requires about:config changes, can't be done via JS)
    // For Safari (WebRTC is more restricted by default)
  }
}

// Interface for the VPN state
interface VpnState {
  connected: boolean
  connecting: boolean
  selectedServer: (typeof VPN_SERVERS)[0]
  publicIp: string
  vpnIp: string
  ojasLayers: number
  attackDetected: boolean
  error: string | null

  // Actions
  setSelectedServer: (server: (typeof VPN_SERVERS)[0]) => void
  connect: () => Promise<void>
  disconnect: () => void
  simulateAttack: () => void
  fetchPublicIp: () => Promise<void>
}

// Create the VPN store
export const useVpnStore = create<VpnState>((set, get) => ({
  connected: false,
  connecting: false,
  selectedServer: VPN_SERVERS[0],
  publicIp: "",
  vpnIp: "",
  ojasLayers: 1,
  attackDetected: false,
  error: null,

  setSelectedServer: (server) => {
    set({ selectedServer: server })
  },

  connect: async () => {
    const state = get()
    if (state.connected) return

    set({ connecting: true, error: null })

    try {
      // Prevent WebRTC leaks
      preventWebRTCLeak()

      // In a real implementation, this would establish a connection to the proxy server
      // For this demo, we'll simulate the connection with a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Get the VPN IP through our proxy
      const response = await fetch(`${PROXY_SERVER}/api/ip`)
      if (!response.ok) throw new Error("Failed to connect to VPN server")

      const vpnIp = await response.text()

      set({
        connected: true,
        connecting: false,
        vpnIp,
        ojasLayers: 1,
      })

      // Set up attack detection
      setTimeout(
        () => {
          if (Math.random() > 0.7 && get().connected) {
            get().simulateAttack()
          }
        },
        10000 + Math.random() * 20000,
      )
    } catch (error) {
      console.error("VPN connection error:", error)
      set({
        connecting: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  },

  disconnect: () => {
    set({
      connected: false,
      vpnIp: "",
      ojasLayers: 1,
      attackDetected: false,
    })
  },

  simulateAttack: () => {
    const state = get()
    if (!state.connected) return

    set({ attackDetected: true })

    // Simulate OJAS responding to attack by adding layers
    let currentLayers = state.ojasLayers

    const interval = setInterval(() => {
      if (currentLayers < 7) {
        currentLayers++
        set({ ojasLayers: currentLayers })
      } else {
        clearInterval(interval)
        setTimeout(() => {
          set({ attackDetected: false })
        }, 2000)
      }
    }, 800)
  },

  fetchPublicIp: async () => {
    try {
      const response = await fetch("https://api.ipify.org")
      if (!response.ok) throw new Error("Failed to fetch IP")

      const ip = await response.text()
      set({ publicIp: ip })
    } catch (error) {
      console.error("Failed to fetch IP:", error)
      set({ publicIp: "Unable to fetch" })
    }
  },
}))

// Function to make requests through the VPN proxy
export async function proxyFetch(url: string, options: RequestInit = {}) {
  const state = useVpnStore.getState()

  if (!state.connected) {
    throw new Error("VPN not connected")
  }

  // Add OJAS encryption layer headers
  const headers = new Headers(options.headers)
  headers.append("X-OJAS-Layers", state.ojasLayers.toString())

  // Proxy the request through our server
  const proxyUrl = `${PROXY_SERVER}/proxy?url=${encodeURIComponent(url)}`

  return fetch(proxyUrl, {
    ...options,
    headers,
  })
}

// Export the server list for use in components
export const VPN_SERVER_LIST = VPN_SERVERS

