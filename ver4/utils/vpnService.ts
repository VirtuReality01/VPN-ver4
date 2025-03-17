// This is a mock implementation of VPN service functions
// In a real app, this would interface with native VPN capabilities

export async function getPublicIp(): Promise<string> {
  // In a real app, this would call an IP lookup service
  // For demo purposes, we'll return a random IP
  return new Promise((resolve) => {
    setTimeout(() => {
      const octet1 = Math.floor(Math.random() * 223) + 1 // Valid first octet
      const octet2 = Math.floor(Math.random() * 256)
      const octet3 = Math.floor(Math.random() * 256)
      const octet4 = Math.floor(Math.random() * 256)

      resolve(`${octet1}.${octet2}.${octet3}.${octet4}`)
    }, 1000)
  })
}

export async function simulateVpnConnection(serverId: string): Promise<{ vpnIp: string }> {
  // In a real app, this would establish a VPN connection
  // For demo purposes, we'll simulate a connection
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        // 90% success rate
        // Generate a VPN IP based on the server
        const serverPrefix =
          serverId === "us1"
            ? "10.0.1."
            : serverId === "nl1"
              ? "10.0.2."
              : serverId === "jp1"
                ? "10.0.3."
                : serverId === "sg1"
                  ? "10.0.4."
                  : serverId === "uk1"
                    ? "10.0.5."
                    : serverId === "de1"
                      ? "10.0.6."
                      : serverId === "ca1"
                        ? "10.0.7."
                        : "10.0.8."

        const lastOctet = Math.floor(Math.random() * 255) + 1
        resolve({ vpnIp: serverPrefix + lastOctet })
      } else {
        reject(new Error("Connection failed"))
      }
    }, 2000)
  })
}

export function generateWireGuardConfig(serverId: string): string {
  // In a real app, this would generate a proper WireGuard config
  // For demo purposes, we'll return a template
  const serverEndpoint =
    serverId === "us1"
      ? "us-nyc.vpn.example.com"
      : serverId === "nl1"
        ? "nl-ams.vpn.example.com"
        : serverId === "jp1"
          ? "jp-tyo.vpn.example.com"
          : serverId === "sg1"
            ? "sg-sin.vpn.example.com"
            : serverId === "uk1"
              ? "uk-lon.vpn.example.com"
              : serverId === "de1"
                ? "de-fra.vpn.example.com"
                : serverId === "ca1"
                  ? "ca-tor.vpn.example.com"
                  : "au-syd.vpn.example.com"

  return `[Interface]
# Private key for the client
PrivateKey = 8GboYh0YF3q/hJLMvfwQkjyNOdGK7rEYj9CzxJOFG2A=
# Client's VPN IP address
Address = 10.0.0.2/32
# DNS servers to use when connected
DNS = 1.1.1.1, 1.0.0.1

[Peer]
# Public key of the server
PublicKey = xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
# Server endpoint
Endpoint = ${serverEndpoint}:51820
# Allow all traffic to go through the VPN
AllowedIPs = 0.0.0.0/0, ::/0
# Keep connection alive
PersistentKeepalive = 25
`
}

