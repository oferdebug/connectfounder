import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";

interface RecentConnectionsProps {
  connections: any[];
  founder: any;
}

export default function RecentConnections({ connections, founder }: RecentConnectionsProps) {
  if (!founder) {
    return null;
  }

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <h3 className="font-semibold text-lg text-slate-900">Recent Connections</h3>
      </CardHeader>
      <CardContent>
        {connections.length === 0 ? (
          <p className="text-sm text-gray-600">No recent connections.</p>
        ) : (
          <ul className="space-y-2">
            {connections.map((connection) => (
              <li key={connection.id} className="border-b border-gray-200 py-2">
                <div className="flex justify-between">
                  <span>{connection.founderAId === founder.id ? connection.founderBId : connection.founderAId}</span>
                  <span className="text-sm text-gray-500">{connection.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
