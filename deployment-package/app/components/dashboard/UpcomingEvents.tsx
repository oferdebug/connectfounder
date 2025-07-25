import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Calendar } from "lucide-react";
import { formatDate } from "../../lib/utils";

interface UpcomingEventsProps {
  events: any[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
      <CardHeader>
        <h3 className="font-semibold text-lg text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-yellow-300" />
          Upcoming Events
        </h3>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-white/70">No upcoming events.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border-b border-white/20 pb-3">
                <div className="font-semibold text-white">{event.title}</div>
                <div className="text-sm text-white/80 flex items-center gap-2 mt-1">
                  <span>📅 {formatDate(event.date)}</span>
                </div>
                <div className="text-sm text-white/70">📍 {event.location}</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
