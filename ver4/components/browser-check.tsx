"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function BrowserCheck() {
  const [browserIssues, setBrowserIssues] = useState<string[]>([])

  useEffect(() => {
    const issues: string[] = []

    // Check if browser supports necessary features
    if (typeof window !== "undefined") {
      // Check for Fetch API
      if (!("fetch" in window)) {
        issues.push("Your browser does not support the Fetch API, which is required for VPN functionality.")
      }

      // Check for Service Workers (needed for advanced proxy functionality)
      if (!("serviceWorker" in navigator)) {
        issues.push("Your browser does not support Service Workers, which may limit some VPN features.")
      }

      // Check for WebRTC (to detect potential leaks)
      if (!("RTCPeerConnection" in window)) {
        issues.push("Your browser does not support WebRTC detection, which may affect IP leak protection.")
      }

      // Check for localStorage (needed for settings)
      try {
        localStorage.setItem("test", "test")
        localStorage.removeItem("test")
      } catch (e) {
        issues.push("Your browser has disabled localStorage, which is required for saving settings.")
      }

      // Check for cookies (needed for authentication)
      if (!navigator.cookieEnabled) {
        issues.push("Your browser has disabled cookies, which are required for authentication.")
      }

      // Check for private browsing mode in Safari
      try {
        const testKey = "test"
        localStorage.setItem(testKey, testKey)
        localStorage.removeItem(testKey)
      } catch (e) {
        issues.push("You appear to be using private browsing mode, which may limit some VPN features.")
      }
    }

    setBrowserIssues(issues)
  }, [])

  if (browserIssues.length === 0) return null

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Browser Compatibility Issues</AlertTitle>
      <AlertDescription>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          {browserIssues.map((issue, index) => (
            <li key={index}>{issue}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}

