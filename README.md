# FounderConnect - README

## 🚀 Professional Networking Platform for Entrepreneurs

FounderConnect is a modern web application built with Next.js that helps entrepreneurs and startup founders connect, network, and collaborate. The platform features a beautiful full-width dashboard, event management, messaging system, and founder discovery tools.

## ✨ Features

### 🏠 **Landing Page**
- Professional homepage with clear value proposition
- Responsive design for all devices
- Call-to-action for registration

### 🔐 **Authentication System**
- Secure user registration and login
- Session management with cookies
- Protected routes with middleware
- Password encryption with bcryptjs

### 📊 **Full-Width Dashboard**
- Beautiful welcome section with gradient background
- Quick stats cards (connections, messages, events, profile completion)
- Recent connections with avatars and company info
- Upcoming events with attendance counts
- Quick action buttons for common tasks

### 🔍 **Founder Discovery**
- Advanced search and filtering
- Founder profiles with skills and experience
- Connection requests and networking
- Industry and location-based filtering

### 📅 **Event Management**
- Browse upcoming networking events
- Event details with location and attendance
- RSVP functionality
- Event creation (future feature)

### 💬 **Messaging System**
- Direct messaging between founders
- Message history and conversations
- Real-time notifications (future feature)

### 👤 **Profile Management**
- Comprehensive profile setup
- Skills, experience, and company information
- Profile completion tracking
- Avatar and company logo uploads

## 🛠 Technology Stack

- **Frontend**: Next.js 15.4.2, React 18, TypeScript
- **Styling**: Tailwind CSS, Headless UI
- **Backend**: Next.js API Routes, Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens, HTTP-only cookies
- **Deployment**: Hostinger Node.js hosting

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or yarn package manager

### Local Development
```bash
# Clone the repository
git clone https://github.com/oferdebug/connectfounder.git
cd founderconnect

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

## 🚀 Deployment to Hostinger

### Quick Deployment
1. Download the production package: `founderconnect-production.zip`
2. Upload to your Hostinger hosting directory
3. Configure Node.js app in hPanel
4. Set environment variables
5. Install dependencies: `npm install --production`
6. Start the application

### Detailed Instructions
See the complete deployment guides:
- `HOSTINGER_DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- `HOSTINGER_NODEJS_SETUP.md` - Detailed Node.js configuration
- `PRODUCTION_DEPLOYMENT_GUIDE.md` - Complete production guide

## 📁 Project Structure

```
founderconnect/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── events/               # Event management
│   │   ├── founders/             # Founder data
│   │   ├── messages/             # Messaging system
│   │   └── profile/              # Profile management
│   ├── components/               # React components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── search/               # Search functionality
│   │   ├── ui/                   # UI components
│   │   └── notifications/        # Notification system
│   ├── dashboard/                # Dashboard page
│   ├── events/                   # Events page
│   ├── login/                    # Login page
│   ├── messages/                 # Messages page
│   ├── profile/                  # Profile page
│   ├── register/                 # Registration page
│   ├── search/                   # Search page
│   └── layout.tsx                # Root layout
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets
├── lib/                          # Utility functions
├── middleware.ts                 # Route protection
├── server.js                     # Production server
└── tailwind.config.js            # Tailwind configuration
```

## 🔧 Configuration

### Environment Variables
```bash
NODE_ENV=production
DATABASE_URL=file:./prisma/dev.db
NEXT_PUBLIC_APP_URL=https://yourdomain.com
PORT=3000
JWT_SECRET=your-jwt-secret
COOKIE_SECRET=your-cookie-secret
```

## 🎉 Ready for Production!

Your FounderConnect platform includes:
- ✅ **Home Page** - Professional landing page
- ✅ **Login System** - Secure authentication
- ✅ **Dashboard** - Beautiful full-width layout
- ✅ **Search** - Find other founders
- ✅ **Events** - Networking events
- ✅ **Messages** - Direct communication
- ✅ **Profile** - Complete user profiles

## 📄 License

This project is licensed under the MIT License.

---

**FounderConnect** - Connecting entrepreneurs worldwide! 🌍✨
