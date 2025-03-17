"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Lock, RefreshCw, ArrowLeft } from "lucide-react"

export default function EncryptionDetails() {
  const router = useRouter()

  const encryptionLayers = [
    {
      id: "wireguard",
      name: "WireGuard",
      description: "Modern VPN protocol with state-of-the-art cryptography",
      details:
        "Uses ChaCha20 for symmetric encryption, Poly1305 for authentication, Curve25519 for ECDH, and BLAKE2s for hashing.",
    },
    {
      id: "chacha20",
      name: "ChaCha20",
      description: "Stream cipher for symmetric encryption",
      details:
        "Designed to provide high security while maintaining high performance on mobile devices without hardware acceleration.",
    },
    {
      id: "poly1305",
      name: "Poly1305",
      description: "Message authentication code",
      details: "Ensures data integrity and authenticity, preventing tampering with encrypted data.",
    },
    {
      id: "ojas",
      name: "OJAS",
      description: "Adaptive multi-layer encryption system",
      details:
        "Proprietary technology that detects intrusion attempts and dynamically adds encryption layers in response to threats.",
    },
  ]

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
              <Shield className="h-5 w-5 text-emerald-500" />
              <span>Multi-Layer Encryption</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-6">
              SecureVPN uses multiple layers of encryption to protect your data. The base layers provide
              industry-standard protection, while the OJAS system adds adaptive security that responds to threats in
              real-time.
            </p>

            <div className="space-y-4">
              {encryptionLayers.map((layer) => (
                <div key={layer.id} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className={layer.id === "ojas" ? "text-amber-500" : "text-emerald-500"} size={18} />
                    <h3 className={`font-medium ${layer.id === "ojas" ? "text-amber-500" : "text-white"}`}>
                      {layer.name}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-200 mb-2">{layer.description}</p>

                  <p className="text-xs text-slate-400">{layer.details}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-700 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="text-blue-500" size={18} />
                <h3 className="font-medium">How It Works Together</h3>
              </div>

              <p className="text-sm text-slate-400 mb-3">
                When you connect to SecureVPN, your data is first encrypted using the WireGuard protocol, which includes
                ChaCha20 encryption and Poly1305 authentication. Then, the OJAS system monitors your connection for
                potential threats.
              </p>

              <p className="text-sm text-slate-400">
                If an attack is detected, OJAS automatically adds up to 7 additional layers of encryption, each stronger
                than the last, creating a virtually impenetrable shield for your data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

