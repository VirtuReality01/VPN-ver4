"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, Check, Share2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ShareLinkProps {
  className?: string
}

export default function ShareLink({ className }: ShareLinkProps) {
  const [copied, setCopied] = useState(false)
  const currentUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "SecureVPN with OJAS Protection",
          text: "Check out this secure VPN with adaptive OJAS encryption!",
          url: currentUrl,
        })
      } catch (err) {
        console.error("Share failed:", err)
      }
    } else {
      copyToClipboard()
    }
  }

  return (
    <div className={cn("flex flex-col space-y-3", className)}>
      <div className="text-sm font-medium">Share SecureVPN</div>
      <div className="flex space-x-2">
        <Input value={currentUrl} readOnly className="bg-slate-700 border-slate-600 text-sm" />
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="bg-slate-700 border-slate-600 hover:bg-slate-600"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
        {navigator.share && (
          <Button
            variant="outline"
            size="icon"
            onClick={shareLink}
            className="bg-slate-700 border-slate-600 hover:bg-slate-600"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}

