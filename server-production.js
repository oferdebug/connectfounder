const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Production configuration
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || 'localhost'
const port = process.env.PORT || 3000

console.log('🚀 Starting FounderConnect server...')
console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
console.log(`🌐 Port: ${port}`)

// Initialize the Next.js app
const app = next({ 
  dev, 
  hostname, 
  port,
  // Custom Next.js configuration for production
  conf: {
    poweredByHeader: false,
    generateEtags: true,
    compress: true
  }
})

const handle = app.getRequestHandler()

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully')
  process.exit(0)
})

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully')
  process.exit(0)
})

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true)
      
      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff')
      res.setHeader('X-Frame-Options', 'DENY')
      res.setHeader('X-XSS-Protection', '1; mode=block')
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
      
      // Handle the request
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('❌ Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })
  .listen(port, (err) => {
    if (err) {
      console.error('❌ Failed to start server:', err)
      throw err
    }
    
    console.log('✅ FounderConnect server ready!')
    console.log(`🌐 Local: http://${hostname}:${port}`)
    console.log('')
    console.log('📄 Available pages:')
    console.log(`   🏠 Home: http://${hostname}:${port}/`)
    console.log(`   🔐 Login: http://${hostname}:${port}/login`)
    console.log(`   📝 Register: http://${hostname}:${port}/register`)
    console.log(`   📊 Dashboard: http://${hostname}:${port}/dashboard`)
    console.log(`   🔍 Search: http://${hostname}:${port}/search`)
    console.log(`   📅 Events: http://${hostname}:${port}/events`)
    console.log(`   💬 Messages: http://${hostname}:${port}/messages`)
    console.log(`   👤 Profile: http://${hostname}:${port}/profile`)
    console.log('')
    console.log('🎉 Ready to connect founders worldwide!')
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`❌ Port ${port} is already in use`)
      console.log('💡 Try setting a different PORT environment variable')
    } else {
      console.error('❌ Server error:', err)
    }
    process.exit(1)
  })
})
