# 🚀 Complete VPS Setup Guide for FounderConnect

## 📋 Prerequisites
- ✅ VPS created on Hostinger
- ✅ VPS IP address and root password (from Hostinger email)
- ✅ Your FounderConnect files ready

## 🔐 Step 1: Connect via SSH

### On Windows:
1. **Download PuTTY** (free SSH client): https://putty.org/
2. **Open PuTTY**:
   - Host Name: `YOUR_VPS_IP_ADDRESS`
   - Port: `22`
   - Connection Type: `SSH`
   - Click **"Open"**
3. **Login**:
   - Username: `root`
   - Password: `YOUR_VPS_PASSWORD` (from Hostinger email)

### On Mac/Linux:
Open Terminal and run:
```bash
ssh root@YOUR_VPS_IP_ADDRESS
```
Enter your VPS password when prompted.

## 🔧 Step 2: Install Node.js 20.x

Once connected to your VPS, run these commands:

### Update System:
```bash
apt update && apt upgrade -y
```

### Install Node.js 20.x:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs
```

### Verify Installation:
```bash
node --version    # Should show v20.x.x
npm --version     # Should show npm version
```

## 📁 Step 3: Upload FounderConnect Files

### Method 1: Using SCP (Recommended)

On your local computer (not VPS), open terminal/command prompt:

```bash
# Navigate to your founderconnect folder
cd /home/dev/Documents/builds/founderconnect

# Upload the production zip file
scp founderconnect-production.zip root@YOUR_VPS_IP:/root/
```

### Method 2: Using SFTP Client
1. **Download FileZilla** (free): https://filezilla-project.org/
2. **Connect**:
   - Host: `sftp://YOUR_VPS_IP`
   - Username: `root`
   - Password: `YOUR_VPS_PASSWORD`
   - Port: `22`
3. **Upload** `founderconnect-production.zip` to `/root/`

## 📦 Step 4: Extract and Setup Files

Back in your VPS SSH terminal:

```bash
# Navigate to root directory
cd /root

# Install unzip if needed
apt install unzip -y

# Extract your app
unzip founderconnect-production.zip

# Navigate to app directory
cd founderconnect

# List files to verify
ls -la
```

You should see:
- `package.json`
- `server.js`
- `app/` folder
- `prisma/` folder
- `.next/` folder

## 📥 Step 5: Install Dependencies

```bash
# Install production dependencies
npm install --production

# Install PM2 for process management
npm install -g pm2
```

## 🔧 Step 6: Configure Environment

Create production environment file:
```bash
# Create .env file
nano .env.production
```

Add this content:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./prisma/dev.db
```

Save and exit (Ctrl+X, then Y, then Enter)

## 🚀 Step 7: Start Your App

### Option 1: Start with PM2 (Recommended)
```bash
# Start app with PM2
pm2 start server.js --name "founderconnect"

# Make PM2 auto-start on reboot
pm2 startup
pm2 save
```

### Option 2: Start Directly
```bash
# Start app directly
npm start
```

## 🌐 Step 8: Configure Firewall & Access

### Open Required Ports:
```bash
# Install UFW firewall
apt install ufw -y

# Allow SSH (important!)
ufw allow 22

# Allow HTTP and HTTPS
ufw allow 80
ufw allow 443

# Allow your app port
ufw allow 3000

# Enable firewall
ufw enable
```

## 🔗 Step 9: Access Your App

Your FounderConnect app should now be running at:
- **Direct access**: `http://YOUR_VPS_IP:3000`
- **Test these URLs**:
  - `http://YOUR_VPS_IP:3000/` (Home page)
  - `http://YOUR_VPS_IP:3000/login` (Login page)
  - `http://YOUR_VPS_IP:3000/register` (Register page)

## 🎯 Step 10: Domain Setup (Optional)

To use your domain instead of IP:

### Update DNS Records:
1. **Go to your domain registrar**
2. **Add A Record**:
   - Name: `@` (or your subdomain)
   - Value: `YOUR_VPS_IP`
   - TTL: `3600`

### Install Nginx (Optional):
```bash
# Install Nginx
apt install nginx -y

# Create Nginx configuration
nano /etc/nginx/sites-available/founderconnect
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/founderconnect /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

## ✅ Verification Checklist

- ✅ SSH connection works
- ✅ Node.js 20.x installed
- ✅ Files uploaded and extracted
- ✅ Dependencies installed
- ✅ App starts without errors
- ✅ Can access via IP:3000
- ✅ Login/Register pages load
- ✅ Dashboard shows full-width layout

## 🔧 Useful Commands

### Check App Status:
```bash
pm2 status
pm2 logs founderconnect
```

### Restart App:
```bash
pm2 restart founderconnect
```

### Stop App:
```bash
pm2 stop founderconnect
```

### View App Logs:
```bash
pm2 logs founderconnect --lines 50
```

## 🆘 Troubleshooting

### App Won't Start:
```bash
# Check logs
pm2 logs founderconnect

# Check if port is in use
netstat -tulpn | grep 3000

# Restart app
pm2 restart founderconnect
```

### Can't Access from Browser:
1. Check firewall: `ufw status`
2. Check if app is running: `pm2 status`
3. Try: `curl localhost:3000` from VPS

### Database Issues:
```bash
# Check database file permissions
ls -la prisma/dev.db
chmod 644 prisma/dev.db
```

Your FounderConnect platform will be live and ready to connect founders worldwide! 🌍
