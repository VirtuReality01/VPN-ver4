// This file would be deployed separately as a Node.js server
const express = require("express")
const cors = require("cors")
const { createProxyMiddleware } = require("http-proxy-middleware")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")

const app = express()
const PORT = process.env.PORT || 3001

// Security headers
app.use(helmet())

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
})
app.use(limiter)

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() })
})

// Proxy configuration
const proxyOptions = {
  target: "https://api.ipify.org",
  changeOrigin: true,
  pathRewrite: {
    "^/api/ip": "/",
  },
  onProxyRes: (proxyRes, req, res) => {
    proxyRes.headers["x-proxied-by"] = "SecureVPN"
  },
}

// Proxy endpoint for IP checking
app.use("/api/ip", createProxyMiddleware(proxyOptions))

// General proxy for web requests
app.use(
  "/proxy",
  createProxyMiddleware({
    router: (req) => {
      // Extract the target URL from the request
      const targetUrl = req.query.url
      if (!targetUrl) {
        throw new Error("Target URL is required")
      }
      return targetUrl
    },
    changeOrigin: true,
    pathRewrite: (path, req) => {
      // Remove the /proxy prefix and the url query parameter
      return path.replace(/^\/proxy/, "").split("?")[0]
    },
    onProxyReq: (proxyReq, req, res) => {
      // Add custom headers to identify the proxy
      proxyReq.setHeader("X-Forwarded-By", "SecureVPN")

      // Add the OJAS encryption layer headers (in a real implementation, this would be actual encryption)
      proxyReq.setHeader("X-OJAS-Layers", req.headers["x-ojas-layers"] || "1")
    },
  }),
)

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`)
})

// Export for serverless environments
module.exports = app

