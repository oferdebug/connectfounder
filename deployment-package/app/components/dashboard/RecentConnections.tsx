import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";

interface RecentConnectionsProps {
  connections: any[];
  founder?: any;
}

export default function RecentConnections({
  connections,
  founder,
}: RecentConnectionsProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader>
        <h3 className="font-semibold text-lg text-white">Recent Connections</h3>
      </CardHeader>
      <CardContent>
        {connections.length === 0 ? (
          <p className="text-sm text-white/70">No recent connections.</p>
        ) : (
          <ul className="space-y-3">
            {connections.map((connection) => (
              <li key={connection.id} className="border-b border-white/20 py-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {connection.name?.charAt(0) || "F"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">
                      {connection.name}
                    </div>
                    <div className="text-white/70 text-sm">
                      {connection.title} at {connection.company}
                    </div>
                  </div>
                  <div className="text-xs text-white/60">
                    {connection.connectedAt?.toLocaleDateString() || "Recently"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
