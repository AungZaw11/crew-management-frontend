// src/features/calendar/components/EventCard.jsx
import React from "react";

const EVENT_COLORS = {
  disembark: "bg-blue-100 text-blue-700 border-blue-200",
  embark: "bg-green-100 text-green-700 border-green-200",
  certificate: "bg-red-100 text-red-700 border-red-200",
  contract: "bg-yellow-100 text-yellow-700 border-yellow-200",
  default: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function EventCard({ event }) {
  const colorClass = EVENT_COLORS[event.type] || EVENT_COLORS.default;

  return (
    <div
      className={`text-xs px-1.5 py-0.5 rounded border ${colorClass} truncate cursor-pointer hover:opacity-80 transition-opacity`}
      title={event.name}
    >
      {event.name}
    </div>
  );
}