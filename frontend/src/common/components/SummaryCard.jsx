// src/common/components/SummaryCard.jsx
import React from "react";

export default function SummaryCard({ data }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-500 font-medium">{data.title}</p>
      <p className="text-2xl font-bold text-gray-800 mt-1">{data.total}</p>
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-sm">
        <span className="text-gray-500">Expiring: {data.expire || 0}</span>
        <span className="text-blue-600 font-medium">{data.days || 0} days left</span>
      </div>
    </div>
  );
}