import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Globe, Shield } from "lucide-react"

interface VpnStatusProps {
  connected: boolean
  publicIp: string
  vpnIp: string
  selectedServer:
    | {
        id: string
        name: string
        location: string
        flag: string
      }
    | undefined
}

export default function VpnStatus({ connected, publicIp, vpnIp, selectedServer }: VpnStatusProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-slate-400" />
          <span className="text-sm">Public IP:</span>
        </div>
        <div>
          {publicIp ? (
            <code className="bg-slate-800 px-2 py-1 rounded text-xs">{publicIp}</code>
          ) : (
            <span className="text-slate-400 text-sm">Loading...</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-slate-400" />
          <span className="text-sm">VPN IP:</span>
        </div>
        <div>
          {connected ? (
            <code className="bg-slate-800 px-2 py-1 rounded text-xs">{vpnIp}</code>
          ) : (
            <span className="text-slate-400 text-sm">Not connected</span>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm">DNS Protection:</span>
        {connected ? (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-400 border-slate-500/20">
            <XCircle className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm">Kill Switch:</span>
        {connected ? (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Enabled
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-slate-500/10 text-slate-400 border-slate-500/20">
            <XCircle className="h-3 w-3 mr-1" /> Disabled
          </Badge>
        )}
      </div>
    </div>
  )
}

