"use client";

import { useRouter, usePathname } from "next/navigation";

interface AppHeaderProps {
  currentPage?: string;
}

export default function AppHeader({ currentPage }: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", path: "/dashboard" },
    { name: "Search", href: "/search", path: "/search" },
    { name: "Messages", href: "/messages", path: "/messages" },
    { name: "Events", href: "/events", path: "/events" },
    { name: "Profile", href: "/profile", path: "/profile" },
  ];

  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => handleNavigation("/dashboard")}>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FounderConnect
              </h1>
              <p className="text-sm text-gray-500 font-medium">
                {currentPage || pathname.replace("/", "").charAt(0).toUpperCase() + pathname.replace("/", "").slice(1) || "Dashboard"}
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`font-medium px-4 py-2 rounded-xl transition-colors ${
                  isActivePath(item.path)
                    ? "text-blue-600 font-semibold bg-blue-50 hover:bg-blue-100"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5a50.9 50.9 0 010-9L15 1h5m-5 16L15 17l-2.5-2.5M9 9a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-900">Current User</p>
                <p className="text-xs text-gray-500">Founder</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
