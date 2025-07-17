import React from "react";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { Calendar } from "lucide-react";
import { formatDate } from "../../lib/utils";

interface UpcomingEventsProps {
  events: any[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
      <CardHeader>
        <h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Upcoming Events
        </h3>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-gray-600">No upcoming events.</p>
        ) : (
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border-b border-gray-200 pb-2">
                <div className="font-semibold text-slate-900">{event.title}</div>
                <div className="text-sm text-gray-600">{formatDate(event.date)}</div>
                <div className="text-sm text-gray-600">{event.location}</div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
