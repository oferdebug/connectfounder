import React, { useState, useEffect } from "react";
import { Founder, Connection, Message, Event } from "../../Entites/all";
import { User } from "../../Entites/User";
import Link from "next/link";
import { createPageUrl } from "../../lib/utils";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Users,
  MessageSquare,
  Calendar,
  TrendingUp,
  ArrowRight,
  Plus,
  Star,
} from "lucide-react";

import QuickStats from "./QuickStats";
import RecentConnections from "./RecentConnections";
import UpcomingEvents from "./UpcomingEvents";
import WelcomeCard from "./WelcomeCard";

interface FounderType {
  companyName: string;
  industry: string;
  fundingStage: string;
  location: string;
  bio?: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [founder, setFounder] = useState<FounderType | null>(null);
  const [stats, setStats] = useState({
    connections: 0,
    messages: 0,
    events: 0,
    profileComplete: 0,
  });
  const [recentConnections, setRecentConnections] = useState<any[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      // Get founder profile
      const founders = await Founder.filter({ created_by: currentUser.email });
      const founderProfile = founders.length > 0 ? founders[0] : null;
      setFounder(founderProfile);

      // Load stats
      const connections = await Connection.filter({
        $or: [
          { founderAId: founderProfile?.id },
          { founderBId: founderProfile?.id },
        ],
      });

      const messages = await Message.filter({
        senderId: currentUser.id,
      });
      const events = await Event.list("-date", 5);

      setStats({
        connections: connections.length,
        messages: messages.length,
        events: events.length,
        profileComplete: calculateProfileComplete(founderProfile),
      });

      setRecentConnections(connections.slice(0, 5));
      setUpcomingEvents(events);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProfileComplete = (founder: FounderType | null) => {
    if (!founder) return 0;
    const fields = [
      "companyName",
      "industry",
      "fundingStage",
      "location",
      "bio",
    ];
    const completed = fields.filter(
      (field) => founder[field as keyof FounderType] && founder[field as keyof FounderType]?.trim().length! > 0
    ).length;
    return Math.round((completed / fields.length) * 100);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {user?.fullName?.split(" ")[0] || "Founder"}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            {founder
              ? `Growing ${founder.companyName} in the ${founder.industry} space`
              : "Ready to connect with fellow founders?"}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={createPageUrl("Discover")}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg">
              <Users className="w-4 h-4 mr-2" />
              Discover Founders
            </Button>
          </Link>
        </div>
      </div>

      {!founder && (
        <WelcomeCard
          onGetStarted={() => (window.location.href = createPageUrl("Profile"))}
        />
      )}

      <QuickStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <RecentConnections
            connections={recentConnections}
            founder={founder}
          />

          <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-500">
                <TrendingUp className="w-5 h-5" />
                <h3 className="font-semibold text-lg">Quick Actions</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href={createPageUrl("Discover")}>
                  <div className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Find Founders
                        </h3>
                        <p className="text-sm text-slate-600">
                          Connect with like-minded entrepreneurs
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
                <Link href={createPageUrl("Events")}>
                  <div className="p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          Browse Events
                        </h3>
                        <p className="text-sm text-slate-600">
                          Discover networking opportunities
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <UpcomingEvents events={upcomingEvents} />

          {founder && stats.profileComplete < 100 && (
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 text-amber-800">
                  <Star className="w-5 h-5" />
                  <h3 className="font-semibold text-lg">Complete Your Profile</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-amber-700">
                      Profile Completeness
                    </span>
                    <span className="font-semibold text-amber-800">
                      {stats.profileComplete}%
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.profileComplete}%` }}
                    ></div>
                  </div>
                  <Link href={createPageUrl("Profile")}>
                    <Button
                      variant="outline"
                      className="w-full border-amber-300 text-amber-700 hover:bg-amber-100"
                    >
                      Complete Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
