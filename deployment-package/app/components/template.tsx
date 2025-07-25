"use client";
import { useState, useEffect } from "react";
import { Icon, Logo } from "./ui/icons";
import Link from "next/link";
import { NotificationProvider } from "../context/NotificationContext";
import { NotificationPanel } from "./notifications/NotificationPanel";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", iconName: "home" },
  { title: "Search", url: "/search", iconName: "search" },
  { title: "Discover", url: "/discover", iconName: "users" },
  { title: "Messages", url: "/messages", iconName: "message" },
  { title: "Events", url: "/events", iconName: "calendar" },
  { title: "Profile", url: "/profile", iconName: "settings" },
];

export default function Template({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    name: "Founder",
    title: "Entrepreneur",
    avatar: "/default-avatar.png",
  });

  // Get user initials for fallback
  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        {/* Top Navigation Bar */}
        <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
          <div className="w-full px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo and Brand */}
              <div className="flex items-center gap-3">
                <Logo className="w-10 h-10 text-white" />
                <div>
                  <h1 className="font-bold text-white text-lg">
                    FounderConnect
                  </h1>
                  <p className="text-xs text-white/70 hidden sm:block">
                    Network • Grow • Succeed
                  </p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-6">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="flex items-center gap-2 text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-white/10"
                  >
                    <Icon name={item.iconName} size={16} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>

              {/* Right side - Notifications & Profile */}
              <div className="flex items-center gap-4">
                <NotificationPanel />

                {/* Profile Avatar & Dropdown */}
                <div className="relative">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg transition-colors"
                  >
                    {/* Profile Image */}
                    <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 overflow-hidden">
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-sm font-bold hidden">
                        {getUserInitials(user.name)}
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="hidden sm:block text-right">
                      <div className="text-white text-sm font-medium">
                        {user.name}
                      </div>
                      <div className="text-white/70 text-xs">{user.title}</div>
                    </div>

                    {/* Dropdown Arrow */}
                    <Icon
                      name="chevronDown"
                      size={16}
                      className="text-white/70"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 w-full">{children}</main>
      </div>
    </NotificationProvider>
  );
}
