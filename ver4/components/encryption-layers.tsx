import { cn } from "@/lib/utils"

interface EncryptionLayersProps {
  active: boolean
}

export default function EncryptionLayers({ active }: EncryptionLayersProps) {
  const layers = [
    { name: "WireGuard", description: "Modern cryptography" },
    { name: "ChaCha20", description: "Symmetric encryption" },
    { name: "Poly1305", description: "Authentication" },
  ]

  return (
    <div className="space-y-2">
      {layers.map((layer, index) => (
        <div
          key={layer.name}
          className={cn(
            "border rounded-md p-2 transition-colors",
            active ? "border-emerald-500/20 bg-emerald-500/5" : "border-slate-700 bg-slate-800/50",
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className={cn("text-sm font-medium", active ? "text-emerald-400" : "text-slate-400")}>
                {layer.name}
              </h4>
              <p className="text-xs text-slate-500">{layer.description}</p>
            </div>
            <div className={cn("h-2 w-2 rounded-full", active ? "bg-emerald-500" : "bg-slate-600")} />
          </div>
        </div>
      ))}
    </div>
  )
}

