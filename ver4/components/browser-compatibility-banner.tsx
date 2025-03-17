"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"

export default function BrowserCompatibilityBanner() {
  const [browser, setBrowser] = useState<string>("")
  const [isCompatible, setIsCompatible] = useState(true)
  const [compatibilityIssues, setCompatibilityIssues] = useState<string[]>([])

  useEffect(() => {
    // Detect browser
    const userAgent = navigator.userAgent
    let detectedBrowser = "Unknown"

    if (userAgent.indexOf("Chrome") > -1) {
      detectedBrowser = "Chrome"
    } else if (userAgent.indexOf("Firefox") > -1) {
      detectedBrowser = "Firefox"
    } else if (userAgent.indexOf("Safari") > -1) {
      detectedBrowser = "Safari"
    } else if (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Edg") > -1) {
      detectedBrowser = "Edge"
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
      detectedBrowser = "Internet Explorer"
    }

    setBrowser(detectedBrowser)

    // Check compatibility
    const issues = []

    if (detectedBrowser === "Internet Explorer") {
      issues.push("Internet Explorer is not supported. Please use a modern browser.")
      setIsCompatible(false)
    }

    if (detectedBrowser === "Safari") {
      issues.push("Safari has limited WebRTC protection. Some VPN features may not work as expected.")
    }

    if (!("serviceWorker" in navigator)) {
      issues.push("Your browser does not support Service Workers, which are required for full VPN functionality.")
      setIsCompatible(false)
    }

    setCompatibilityIssues(issues)
  }, [])

  if (isCompatible && compatibilityIssues.length === 0) {
    return null
  }

  return (
    <Alert variant={isCompatible ? "default" : "destructive"} className="mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Browser Compatibility: {browser}</AlertTitle>
      <AlertDescription>
        {compatibilityIssues.length > 0 ? (
          <ul className="list-disc pl-5 mt-2">
            {compatibilityIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        ) : (
          <p>Your browser is fully compatible with SecureVPN.</p>
        )}
      </AlertDescription>
    </Alert>
  )
}

