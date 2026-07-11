// src/features/dashboard/components/DashboardExpiredTable.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../../common/hooks/LanguageContext";

// ============================================================
// EXPIRED TABLE - Component
// ============================================================
export default function DashboardExpiredTable({ expiredData, loading, onSeeAll }) {
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

  const data = expiredData?.length > 0 ? expiredData : [
    { id: 1, name: "Aung Ko Htet", rank: "Chief Officer", certificate: "STCW", expiryDate: "2024-01-15" },
    { id: 2, name: "Mg Mg Lwin", rank: "Engineer", certificate: "Medical", expiryDate: "2024-02-01" },
    { id: 3, name: "Htoo Htoo", rank: "Able Seaman", certificate: "Passport", expiryDate: "2024-02-10" },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {t("expired_certificates") || "Expired Certificates"}
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
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {item.expiryDate}
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
            {t("no_expired_certificates") || "No expired certificates"}
          </p>
        </div>
      )}
    </div>
  );
}