# Hostinger Node.js Setup Guide for FounderConnect

## 🔧 Node.js Configuration on Hostinger

### Method 1: Using Hostinger's Node.js App Manager

1. **Access hPanel** → Navigate to "Node.js App" or "Application Manager"

2. **Create New Application**:
   - **Node.js Version**: Select 18.x or 20.x (latest LTS)
   - **Application Root**: `/public_html` or your domain folder
   - **Application URL**: Your domain (e.g., `yourdomain.com`)
   - **Application Startup File**: `server.js` (we'll create this)

3. **Environment Variables** (Add these in hPanel):
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=file:./prisma/dev.db
   ```

### Method 2: Manual Setup via File Manager/SSH

1. **Upload Files**:
   - Extract `founderconnect-hostinger.zip` to `/public_html/`
   - Or upload to your domain's root directory

2. **Create server.js** (Next.js startup file):
   ```javascript
   const { createServer } = require('http')
   const { parse } = require('url')
   const next = require('next')
   
   const dev = process.env.NODE_ENV !== 'production'
   const hostname = 'localhost'
   const port = process.env.PORT || 3000
   
   const app = next({ dev, hostname, port })
   const handle = app.getRequestHandler()
   
   app.prepare().then(() => {
     createServer(async (req, res) => {
       try {
         const parsedUrl = parse(req.url, true)
         await handle(req, res, parsedUrl)
       } catch (err) {
         console.error('Error occurred handling', req.url, err)
         res.statusCode = 500
         res.end('internal server error')
       }
     }).listen(port, (err) => {
       if (err) throw err
       console.log(`> Ready on http://${hostname}:${port}`)
     })
   })
   ```

3. **Install Dependencies**:
   ```bash
   npm install --production
   ```

4. **Start Application**:
   ```bash
   npm start
   # or
   node server.js
   ```

## 🌐 Your FounderConnect App Structure

Your app includes these key pages:

### **Public Routes**:
- **Home Page** (`/`) - Landing page for visitors
- **Login Page** (`/login`) - User authentication
- **Register Page** (`/register`) - New user signup

### **Protected Routes** (require authentication):
- **Dashboard** (`/dashboard`) - Main user dashboard with full-width layout
- **Search** (`/search`) - Find and connect with founders
- **Events** (`/events`) - Browse and join events
- **Messages** (`/messages`) - Communication center
- **Profile** (`/profile`) - User profile management

### **API Routes**:
- `/api/auth/*` - Authentication endpoints
- `/api/founders` - Founder data
- `/api/events` - Event management
- `/api/messages` - Messaging system
- `/api/profile` - Profile operations

## 🔐 Database Setup

Your app uses SQLite with Prisma:
- Database file: `prisma/dev.db` (included in package)
- Schema: `prisma/schema.prisma`
- Auto-migration on startup

## 🚀 Domain Configuration

1. **Point Domain** to your Node.js app port
2. **SSL Certificate** - Enable in Hostinger hPanel
3. **Custom Error Pages** - 404/500 handled by Next.js

## 🔧 Common Hostinger Node.js Issues & Solutions

### Issue 1: "Application Not Starting"
**Solution**: Check Node.js version compatibility
```bash
node --version  # Should be 18.x or 20.x
```

### Issue 2: "Port Already in Use"
**Solution**: Use environment variable for port
```javascript
const port = process.env.PORT || 3000
```

### Issue 3: "Module Not Found"
**Solution**: Run npm install in correct directory
```bash
cd /public_html/your-app
npm install --production
```

### Issue 4: "Database Connection Error"
**Solution**: Ensure database file permissions
```bash
chmod 755 prisma/
chmod 644 prisma/dev.db
```

## 📱 Mobile & Desktop Compatibility

Your FounderConnect app is fully responsive:
- ✅ Mobile-optimized dashboard
- ✅ Touch-friendly navigation
- ✅ Responsive grid layouts
- ✅ Adaptive sidebar menu

## 🎯 Post-Deployment Checklist

1. ✅ Home page loads correctly
2. ✅ Login/Register functionality works
3. ✅ Dashboard displays full-width layout
4. ✅ Navigation between pages works
5. ✅ Static assets (images, CSS) load
6. ✅ API endpoints respond correctly
7. ✅ SSL certificate active
8. ✅ Mobile responsiveness confirmed

Your FounderConnect platform is ready to connect founders worldwide! 🌍
