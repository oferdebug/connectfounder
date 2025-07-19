"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthState } from "@/lib/auth-state";
import SimpleDashboard from "../components/dashboard/dashboard";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Prevent multiple auth checks
      if (authChecked) return;

      try {
        console.log("Dashboard: Checking authentication...");
        const auth = getAuthState();
        console.log("Dashboard: Auth state:", auth);

        if (!auth.isAuthenticated || !auth.token) {
          console.log("Dashboard: Not authenticated, redirecting to login");
          window.location.href = "/login";
          return;
        }

        console.log("Dashboard: User is authenticated, showing dashboard");
        setAuthChecked(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Dashboard: Auth check failed:", error);
        window.location.href = "/login";
      }
    };

    checkAuth();
  }, [authChecked]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <SimpleDashboard />;
}
