// src/features/dashboard/components/DashboardCharts.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useLanguage } from "../../../common/hooks/LanguageContext";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

export default function DashboardCharts({ stats, loading }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // ===== VESSEL DATA =====
  const vesselData = stats?.vesselChartData || [
    { name: "Sun Rio", value: 24 },
    { name: "Woori Sun", value: 18 },
    { name: "HS Glory", value: 15 },
    { name: "Oriental Star", value: 12 },
    { name: "Ocean Leader", value: 8 },
  ];

  // ===== RANK DATA =====
  const rankData = stats?.rankChartData || [
    { name: "Captain", value: 45 },
    { name: "Pilot", value: 30 },
    { name: "Engineer", value: 20 },
    { name: "Able Seaman", value: 15 },
    { name: "Others", value: 10 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
      {/* Vessel Pie Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t("vessel") || "Vessel"} {t("distribution") || "Distribution"}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={vesselData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {vesselData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Rank Bar Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          {t("rank") || "Rank"} {t("distribution") || "Distribution"}
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rankData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}