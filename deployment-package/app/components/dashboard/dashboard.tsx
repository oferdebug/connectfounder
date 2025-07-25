"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeCard from "./WelcomeCard";
import QuickStats from "./QuickStats";
import RecentConnections from "./RecentConnections";
import UpcomingEvents from "./UpcomingEvents";

export default function Dashboard() {
  const router = useRouter();

  // Mock data for the components
  const stats = {
    connections: 42,
    messages: 24,
    events: 8,
    profileComplete: 89,
  };

  const connections = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "AI Startup Founder",
      company: "TechFlow AI",
      connectedAt: new Date("2024-12-13T10:00:00Z"),
    },
    {
      id: "2",
      name: "Marcus Johnson",
      title: "Fintech Entrepreneur",
      company: "PayStream",
      connectedAt: new Date("2024-12-12T15:30:00Z"),
    },
    {
      id: "3",
      name: "Lisa Rodriguez",
      title: "E-commerce Founder",
      company: "ShopSmart",
      connectedAt: new Date("2024-12-10T09:15:00Z"),
    },
  ];

  const events = [
    {
      id: "1",
      title: "Tech Founders Meetup",
      date: new Date("2024-12-15T18:00:00Z"),
      location: "San Francisco",
      attendees: 42,
    },
    {
      id: "2",
      title: "Startup Pitch Night",
      date: new Date("2024-12-18T19:00:00Z"),
      location: "Virtual",
      attendees: 156,
    },
    {
      id: "3",
      title: "AI Innovation Summit",
      date: new Date("2024-12-22T09:00:00Z"),
      location: "New York",
      attendees: 298,
    },
  ];

  const founder = {
    id: "1",
    name: "Current User",
    title: "Founder",
    company: "Your Company",
  };

  const handleGetStarted = () => {
    router.push("/profile");
  };

  return (
    <div className="w-full h-full p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white/80 text-lg">
            Welcome back! Here's what's happening in your founder journey.
          </p>
        </div>

        {/* Welcome Card */}
        <WelcomeCard />

        {/* Quick Stats */}
        <QuickStats stats={stats} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentConnections connections={connections} />
          <UpcomingEvents events={events} />
        </div>
      </div>
    </div>
  );
}
