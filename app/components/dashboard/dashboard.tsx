// Create this as: app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function SimpleDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🎉 Dashboard page loaded successfully!");
  }, []);

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
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-green-200">
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              LOGIN SUCCESSFUL!
            </h1>
            <p className="text-gray-600">
              You have successfully logged in and reached the dashboard!
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
              <h2 className="text-xl font-semibold">
                Welcome to FounderConnect
              </h2>
            </div>
            <p className="text-gray-600">
              Your authentication flow is working perfectly!
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
                Middleware
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
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
                onClick={() => {
                  document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                  window.location.href = "/login";
                }}
                className="w-full text-left px-3 py-2 text-sm bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-gray-800 text-green-400 rounded-xl p-6 font-mono text-sm">
          <h3 className="text-white mb-3">🔧 Debug Information</h3>
          <div className="space-y-1">
            <div>✅ Page mounted at: {new Date().toLocaleTimeString()}</div>
            <div>
              ✅ URL:{" "}
              {typeof window !== "undefined"
                ? window.location.href
                : "Loading..."}
            </div>
            <div>
              ✅ User Agent:{" "}
              {typeof navigator !== "undefined"
                ? navigator.userAgent.substring(0, 50) + "..."
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
