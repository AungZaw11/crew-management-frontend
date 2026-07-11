// src/features/dashboard/components/DashboardExpireTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DashboardExpireTable({ data, loading }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const tableData = data?.length > 0 ? data : [
    { id: 1, name: "Certificate of Endorsement (GMDSS)", capacity: "92%", remaining: "30 Days" },
    { id: 2, name: "Captain", capacity: "45%", remaining: "30 Days" },
    { id: 3, name: "Pilot", capacity: "100%", remaining: "30 Days" },
    { id: 4, name: "Captain", capacity: "12%", remaining: "30 Days" },
    { id: 5, name: "Pilot", capacity: "12%", remaining: "30 Days" },
  ];

  const getCapacityColor = (capacity) => {
    const num = parseInt(capacity);
    if (num >= 80) return "text-green-600";
    if (num >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Calendar size={18} className="text-red-600" />
        <h2 className="text-lg font-semibold text-gray-800">
          {t("expire_date") || "Expire Date"} &amp; {t("remaining_date") || "Remaining Date"}
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("education_name") || "Education Name"}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("expire_date") || "Expire Date"}
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                {t("remaining_date") || "Remaining Date"}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tableData.map((item) => (
              <tr 
                key={item.id} 
                className="hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => navigate(`/crew/${item.id}`)}
              >
                <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-medium ${getCapacityColor(item.capacity)}`}>
                    {item.capacity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{item.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}