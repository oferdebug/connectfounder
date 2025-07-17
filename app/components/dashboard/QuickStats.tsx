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
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <CardTitle>Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{stats.connections}</div>
            <div className="text-sm text-gray-600">Connections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{stats.messages}</div>
            <div className="text-sm text-gray-600">Messages</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{stats.events}</div>
            <div className="text-sm text-gray-600">Events</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-600">{stats.profileComplete}%</div>
            <div className="text-sm text-gray-600">Profile Complete</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
