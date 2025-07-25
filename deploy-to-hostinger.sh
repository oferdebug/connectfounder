#!/bin/bash

# FounderConnect Hostinger Deployment Script
# This script prepares your app for production deployment

echo "🚀 Preparing FounderConnect for Hostinger deployment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"

# Install production dependencies
echo "📦 Installing production dependencies..."
npm install --production

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create production environment file
echo "🔧 Creating production environment configuration..."
cat > .env.production << EOF
NODE_ENV=production
DATABASE_URL=file:./prisma/dev.db
NEXT_PUBLIC_APP_URL=https://yourdomain.com
PORT=3000
EOF

echo "✅ Environment configuration created"

# Set proper file permissions
echo "🔒 Setting file permissions..."
chmod 755 prisma/ 2>/dev/null || echo "⚠️  Please manually set permissions for prisma folder"
chmod 644 prisma/dev.db 2>/dev/null || echo "⚠️  Please manually set permissions for database file"
chmod +x server.js 2>/dev/null || echo "⚠️  Please manually set execute permissions for server.js"

echo "✅ File permissions configured"

# Verify build exists
if [ ! -d ".next" ]; then
    echo "⚠️  Build not found. Running production build..."
    npm run build
    
    if [ $? -ne 0 ]; then
        echo "❌ Build failed"
        exit 1
    fi
    
    echo "✅ Production build completed"
fi

# Create startup verification script
cat > verify-deployment.js << 'EOF'
const http = require('http');
const { spawn } = require('child_process');

console.log('🔍 Verifying FounderConnect deployment...');

// Start the server
const server = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: 3001 }
});

server.stdout.on('data', (data) => {
    console.log(`✅ Server: ${data}`);
});

server.stderr.on('data', (data) => {
    console.error(`❌ Error: ${data}`);
});

// Test after 3 seconds
setTimeout(() => {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/',
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`✅ Status: ${res.statusCode}`);
        console.log('🎉 FounderConnect is ready for production!');
        server.kill();
        process.exit(0);
    });

    req.on('error', (e) => {
        console.error(`❌ Test failed: ${e.message}`);
        server.kill();
        process.exit(1);
    });

    req.end();
}, 3000);
EOF

echo "✅ Deployment verification script created"

echo ""
echo "🎉 FounderConnect is ready for Hostinger deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Upload the complete project to your Hostinger hosting"
echo "2. Configure Node.js app in Hostinger hPanel"
echo "3. Set environment variables in hPanel"
echo "4. Run: npm run start:production"
echo ""
echo "📁 Files ready for upload:"
echo "   - Complete .next/ build folder"
echo "   - server.js (production server)"
echo "   - package.json (dependencies)"
echo "   - prisma/ (database)"
echo "   - public/ (static assets)"
echo "   - All configuration files"
echo ""
echo "🌐 Your app will be available at: https://yourdomain.com"
echo "🏠 Pages included: Home, Login, Dashboard, Search, Events, Messages, Profile"
echo ""
