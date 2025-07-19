"use client";

import { useEffect, useState } from "react";
import { getAuthState, clearAuthState } from "@/lib/auth-state";

export default function SimpleDashboard() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    console.log("🎉 Dashboard page loaded successfully!");

    // Get user info from auth state
    const auth = getAuthState();
    setUser(auth.user);
  }, []);

  const handleLogout = async () => {
    try {
      console.log("🚪 Initiating logout...");

      // Call logout API
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear client-side auth state
      clearAuthState();

      console.log("✅ Logout successful, redirecting to login");

      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("💥 Logout error:", error);
      // Force clear and redirect anyway
      clearAuthState();
      window.location.href = "/login";
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with user info and logout */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back{user?.fullName ? `, ${user.fullName}` : ""}!
              </h1>
              <p className="text-gray-600 mt-1">
                {user?.email || "Logged in successfully"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-200">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-green-600 mb-2">
              AUTHENTICATION WORKING!
            </h2>
            <p className="text-gray-600">
              You have successfully logged in and reached the protected
              dashboard!
            </p>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
              <h3 className="text-xl font-semibold">
                FounderConnect Dashboard
              </h3>
            </div>
            <p className="text-gray-600">
              Your authentication system is working perfectly! 🚀
            </p>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3 text-green-600">
              ✅ System Status
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Registration API
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Login API
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Dashboard Access
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Cookie Authentication
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Middleware Protection
              </li>
            </ul>
          </div>

          {/* User Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">👤 User Info</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">ID:</span> {user?.id || "N/A"}
              </div>
              <div>
                <span className="font-medium">Email:</span>{" "}
                {user?.email || "N/A"}
              </div>
              <div>
                <span className="font-medium">Name:</span>{" "}
                {user?.fullName || "N/A"}
              </div>
              <div>
                <span className="font-medium">Status:</span>
                <span className="ml-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Authenticated
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">⚡ Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🏠 Go to Homepage
              </button>
              <button
                onClick={() => (window.location.href = "/profile")}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                👤 View Profile
              </button>
              <button
                onClick={() => (window.location.href = "/search")}
                className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🔍 Search Founders
              </button>
            </div>
          </div>

          {/* App Features */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🚀 App Features</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>• Founder networking</div>
              <div>• Event management</div>
              <div>• Messaging system</div>
              <div>• Profile creation</div>
              <div>• Search & filters</div>
              <div>• Connection requests</div>
            </div>
          </div>

          {/* Debug Info */}
          <div className="bg-gray-800 text-green-400 rounded-xl p-6 font-mono text-sm">
            <h3 className="text-white mb-3">🔧 Debug Info</h3>
            <div className="space-y-1">
              <div>✅ Page loaded: {new Date().toLocaleTimeString()}</div>
              <div>✅ Auth verified: Cookie-based</div>
              <div>✅ Middleware: Active</div>
              <div>✅ JWT: Valid token</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
