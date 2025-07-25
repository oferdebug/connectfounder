# FounderConnect - Hostinger Deployment Guide

## 🚀 Your FounderConnect app is ready for Hostinger!

### Option 1: Node.js Hosting (Recommended)

If your Hostinger plan supports Node.js:

1. **Upload the deployment package**: `founderconnect-hostinger.zip`
2. **Extract it in your hosting directory**
3. **Install dependencies**:
   ```bash
   npm install --production
   ```
4. **Set up environment variables** in your Hostinger control panel:
   ```
   NODE_ENV=production
   DATABASE_URL=your_database_url
   ```
5. **Start the application**:
   ```bash
   npm start
   ```

### Option 2: Static File Hosting

If you only have static file hosting:

1. Upload the contents of the `.next/static/` folder to your public directory
2. Configure your web server to serve the static files
3. Note: API routes won't work with static hosting

### 📁 Files Included in the Package:
- ✅ Built application (.next/)
- ✅ Package configuration (package.json)
- ✅ Database schema (prisma/)
- ✅ Static assets (public/)
- ✅ Configuration files (next.config.mjs, middleware.ts)

### 🌐 Your FounderConnect Features:
- Beautiful full-width dashboard
- User authentication system
- Founder search and connections
- Event management
- Messaging system
- Profile management
- Responsive design

### 🎯 Next Steps:
1. Login to your Hostinger control panel
2. Navigate to your hosting file manager or use FTP
3. Upload and extract the `founderconnect-hostinger.zip` file
4. Configure your Node.js environment
5. Set up your database connection
6. Launch your app!

Your FounderConnect platform is production-ready! 🎉
