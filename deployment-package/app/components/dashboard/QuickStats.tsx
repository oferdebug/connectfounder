import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, MessageSquare, Calendar } from "lucide-react";

interface QuickStatsProps {
  stats: {
    connections: number;
    messages: number;
    events: number;
    profileComplete: number;
  };
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="text-white">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-white">
              {stats.connections}
            </div>
            <div className="text-sm text-white/70">Connections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-300">
              {stats.messages}
            </div>
            <div className="text-sm text-white/70">Messages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-pink-300">
              {stats.events}
            </div>
            <div className="text-sm text-white/70">Events</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-300">
              {stats.profileComplete}%
            </div>
            <div className="text-sm text-white/70">Profile Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
