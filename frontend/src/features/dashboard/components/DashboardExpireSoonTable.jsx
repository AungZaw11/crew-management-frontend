// src/features/dashboard/components/DashboardExpireSoonTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";

export default function DashboardExpireSoonTable({ expireSoonData, loading, onSeeAll }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const data = expireSoonData?.length > 0 ? expireSoonData : [
    { id: 1, name: "Ye Phyo Win", rank: "2nd Officer", certificate: "GMDSS", expiryDate: "2024-04-15", daysLeft: 15 },
    { id: 2, name: "Kyaw Zin", rank: "Chief Engineer", certificate: "STCW", expiryDate: "2024-04-20", daysLeft: 20 },
    { id: 3, name: "Nay Lin", rank: "Boatswain", certificate: "Medical", expiryDate: "2024-04-25", daysLeft: 25 },
  ];

  const getStatusColor = (daysLeft) => {
    if (daysLeft <= 7) return "bg-red-100 text-red-700";
    if (daysLeft <= 15) return "bg-orange-100 text-orange-700";
    if (daysLeft <= 30) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("expiring_soon") || "Expiring Soon"}
        </h2>
        <button
          onClick={onSeeAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {t("see_all") || "See All →"}
        </button>
      </div>

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 rounded-t-lg">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("name") || "Name"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("rank") || "Rank"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("certificate") || "Certificate"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("expiry_date") || "Expiry Date"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("days_left") || "Days Left"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((item) => (
                <tr 
                  key={item.id} 
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate(`/crew/${item.id}`)}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-800">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.rank || "-"}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.certificate}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{item.expiryDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(item.daysLeft)}`}>
                      {item.daysLeft} {t("days") || "days"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">
            {t("no_expiring_certificates") || "No certificates expiring soon"}
          </p>
        </div>
      )}
    </div>
  );
}