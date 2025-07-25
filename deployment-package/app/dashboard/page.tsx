"use client";

import Dashboard from "../components/dashboard/dashboard";

export default function DashboardPage() {
  // Since middleware already handles authentication,
  // we don't need to check auth again on the client side
  return <Dashboard />;
}
