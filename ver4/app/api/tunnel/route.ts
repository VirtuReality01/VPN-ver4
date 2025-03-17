import { type NextRequest, NextResponse } from "next/server"

// This is a server-side proxy endpoint that will tunnel requests through our server
export async function POST(request: NextRequest) {
  try {
    const { url, method, headers, body } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Get the OJAS encryption layers from the request
    const ojasLayers = request.headers.get("x-ojas-layers") || "1"

    // In a real implementation, this would use a proper proxy server
    // For this demo, we're making a direct fetch but adding our headers
    const requestHeaders = new Headers()

    // Copy over the original headers, excluding some that might cause issues
    if (headers) {
      Object.entries(headers).forEach(([key, value]) => {
        if (!["host", "connection", "content-length"].includes(key.toLowerCase())) {
          requestHeaders.set(key, value as string)
        }
      })
    }

    // Add our custom headers
    requestHeaders.set("X-Forwarded-By", "SecureVPN")
    requestHeaders.set("X-OJAS-Layers", ojasLayers)

    // Make the request
    const response = await fetch(url, {
      method: method || "GET",
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
      redirect: "follow",
    })

    // Get the response data
    const responseData = await response.text()

    // Return the proxied response
    return new NextResponse(responseData, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/plain",
        "X-Proxied-By": "SecureVPN",
        "X-OJAS-Layers": ojasLayers,
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to proxy request" }, { status: 500 })
  }
}

