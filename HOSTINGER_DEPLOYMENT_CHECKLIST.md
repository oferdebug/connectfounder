# Hostinger Deployment Checklist for FounderConnect

## 📋 Pre-Deployment Checklist

### ✅ Files Verification
- [ ] `founderconnect-production.zip` downloaded
- [ ] All files extracted to hosting directory
- [ ] `.next/` folder present with built application
- [ ] `server.js` or `server-production.js` present
- [ ] `package.json` with production dependencies
- [ ] `prisma/` folder with database schema and data
- [ ] `public/` folder with static assets

### ✅ Hostinger Configuration
- [ ] Node.js application created in hPanel
- [ ] Node.js version set to 18.x or 20.x
- [ ] Document root configured correctly
- [ ] Startup file set to `server.js`
- [ ] Auto-start enabled

### ✅ Environment Variables Set
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000` (or Hostinger assigned port)
- [ ] `DATABASE_URL=file:./prisma/dev.db`
- [ ] `NEXT_PUBLIC_APP_URL=https://yourdomain.com`

### ✅ File Permissions
- [ ] `chmod 755 prisma/`
- [ ] `chmod 644 prisma/dev.db`
- [ ] `chmod +x server.js`

### ✅ Dependencies Installed
- [ ] Run `npm install --production` completed successfully
- [ ] No dependency errors in console

## 🚀 Deployment Steps

### Step 1: Upload Files
1. Access Hostinger File Manager
2. Navigate to your domain's root directory (`/public_html/`)
3. Upload `founderconnect-production.zip`
4. Extract all files

### Step 2: Configure Node.js App
1. Go to hPanel → Node.js Apps (or Application Manager)
2. Click "Create Application"
3. Fill configuration:
   ```
   App Name: FounderConnect
   Node.js Version: 20.x LTS
   Document Root: /public_html
   Startup File: server.js
   ```

### Step 3: Set Environment Variables
In the Node.js app configuration, add:
```
NODE_ENV=production
PORT=3000
DATABASE_URL=file:./prisma/dev.db
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Step 4: Install Dependencies
Open terminal in hPanel or SSH:
```bash
cd /public_html
npm install --production
```

### Step 5: Start Application
Click "Start Application" in hPanel or run:
```bash
npm run start:production
```

## 🔍 Post-Deployment Testing

### ✅ Basic Functionality Tests
- [ ] Home page loads (`https://yourdomain.com/`)
- [ ] Login page accessible (`/login`)
- [ ] Registration works (`/register`)
- [ ] Dashboard loads after login (`/dashboard`)
- [ ] Search page functional (`/search`)
- [ ] Events page displays (`/events`)
- [ ] Messages page accessible (`/messages`)
- [ ] Profile page loads (`/profile`)

### ✅ Authentication Tests
- [ ] User can register new account
- [ ] User can login with credentials
- [ ] Protected routes redirect to login when not authenticated
- [ ] User can logout successfully
- [ ] Session persists across page refreshes

### ✅ Dashboard Tests
- [ ] Welcome card displays
- [ ] Quick stats show correct numbers
- [ ] Recent connections list populated
- [ ] Upcoming events displayed
- [ ] Full-width layout working correctly
- [ ] Navigation menu functional

### ✅ Mobile Responsiveness
- [ ] Site works on mobile devices
- [ ] Navigation menu adapts to mobile
- [ ] Dashboard layout responsive
- [ ] Touch interactions work properly

### ✅ Performance Tests
- [ ] Page load times acceptable (< 3 seconds)
- [ ] Static assets loading correctly
- [ ] No JavaScript errors in console
- [ ] Database queries responding quickly

## 🚨 Troubleshooting Common Issues

### Issue: Application Won't Start
**Symptoms**: "Application failed to start" in hPanel
**Solutions**:
1. Check Node.js version (must be 18+ or 20+)
2. Verify startup file path is correct
3. Check for syntax errors in server.js
4. Review error logs in hPanel

### Issue: 404 Errors on Routes
**Symptoms**: Pages show "Not Found" errors
**Solutions**:
1. Verify `.next` folder uploaded completely
2. Check if build completed successfully
3. Ensure all route files present
4. Restart the application

### Issue: Database Connection Errors
**Symptoms**: "Cannot access database" errors
**Solutions**:
1. Check prisma folder permissions: `chmod 755 prisma/`
2. Check database file permissions: `chmod 644 prisma/dev.db`
3. Verify DATABASE_URL environment variable
4. Ensure prisma folder uploaded correctly

### Issue: Static Assets Not Loading
**Symptoms**: Images, CSS, or JS files not loading
**Solutions**:
1. Verify `public/` folder uploaded
2. Check `.next/static/` folder present
3. Clear browser cache
4. Check file permissions

### Issue: Slow Performance
**Symptoms**: Pages load slowly
**Solutions**:
1. Enable compression in Hostinger settings
2. Optimize images in public folder
3. Check database query performance
4. Monitor server resources

## 📞 Getting Help

### Hostinger Support Resources:
1. **Knowledge Base**: Search Hostinger help articles
2. **Live Chat**: Available 24/7 for technical issues
3. **Ticket System**: For complex deployment problems

### Application Logs:
- Check error logs in hPanel → Node.js Apps → View Logs
- Monitor server console output
- Use browser dev tools for client-side issues

### Performance Monitoring:
- Monitor CPU and memory usage in hPanel
- Check database file size growth
- Monitor page load times

## 🎉 Success Confirmation

Your FounderConnect platform is successfully deployed when:

✅ All pages load without errors
✅ User registration and login work
✅ Dashboard displays with full-width layout
✅ Navigation between pages is smooth
✅ Mobile responsiveness confirmed
✅ SSL certificate active (https://)
✅ No console errors
✅ Performance is acceptable

**Congratulations! Your founder networking platform is now live! 🚀**
