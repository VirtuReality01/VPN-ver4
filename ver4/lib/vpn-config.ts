export function generateConfig(serverName: string): string {
  // This is a template for WireGuard configuration
  // In a real implementation, this would be generated with proper keys
  return `[Interface]
# Private key for the client (this would be unique per client)
PrivateKey = 8GboYh0YF3q/hJLMvfwQkjyNOdGK7rEYj9CzxJOFG2A=
# Client's VPN IP address
Address = 10.0.0.2/32
# DNS servers to use when connected
DNS = 1.1.1.1, 1.0.0.1

[Peer]
# Public key of the server
PublicKey = xTIBA5rboUvnH4htodjb6e697QjLERt1NAB4mZqp8Dg=
# Server endpoint (this would be your actual server)
Endpoint = ${serverName.toLowerCase()}.example-vpn.com:51820
# Allow all traffic to go through the VPN
AllowedIPs = 0.0.0.0/0, ::/0
# Keep connection alive
PersistentKeepalive = 25
`
}

