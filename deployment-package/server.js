const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

// Initialize the Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true)
      
      // Handle the request
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })
  .listen(port, (err) => {
    if (err) throw err
    console.log(`> FounderConnect ready on http://${hostname}:${port}`)
    console.log('> Your pages:')
    console.log('  - Home: /')
    console.log('  - Login: /login')
    console.log('  - Dashboard: /dashboard')
    console.log('  - Search: /search')
    console.log('  - Events: /events')
    console.log('  - Messages: /messages')
    console.log('  - Profile: /profile')
  })
})
