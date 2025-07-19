"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthState, clearAuthState } from "@/lib/auth-state";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Dashboard: Checking authentication...");

        // Wait a tiny bit for cookies to be available after redirect
        await new Promise((resolve) => setTimeout(resolve, 100));

        const auth = getAuthState();
        console.log("📊 Dashboard: Auth state:", auth);

        if (!auth.isAuthenticated || !auth.token) {
          console.log("❌ Dashboard: Not authenticated, redirecting to login");
          clearAuthState(); // Clean up any invalid state
          window.location.href = "/login";
          return;
        }

        console.log("✅ Dashboard: User is authenticated, showing dashboard");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("💥 Dashboard: Auth check failed:", error);
        clearAuthState();
        window.location.href = "/login";
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Welcome to your Dashboard!
          </h2>
          <p className="text-gray-600">You have successfully logged in.</p>

          <div className="mt-6">
            <a
              href="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
