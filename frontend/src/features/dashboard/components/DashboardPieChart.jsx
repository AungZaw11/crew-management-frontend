// src/features/dashboard/components/DashboardPieChart.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

// ============================================================
// CUSTOM TOOLTIP
// ============================================================
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-800">{payload[0].name}</p>
        <p className="text-lg font-bold text-gray-900">{payload[0].value}</p>
      </div>
    );
  }
  return null;
}

// ============================================================
// PIE CHART - Component
// ============================================================
export default function DashboardPieChart({ totalCrews, signOn, signOff, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  const data = [
    { name: t("sign_on") || "Sign On", value: signOn || 0 },
    { name: t("sign_off") || "Sign Off", value: signOff || 0 },
    { 
      name: t("on_leave") || "On Leave", 
      value: Math.max(0, (totalCrews || 0) - (signOn || 0) - (signOff || 0)) 
    },
  ];

  // Filter out zero values
  const filteredData = data.filter((item) => item.value > 0);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        {t("crew_status_distribution") || "Crew Status Distribution"}
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={filteredData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}