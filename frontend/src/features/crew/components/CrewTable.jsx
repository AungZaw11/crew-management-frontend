// src/features/crew/components/CrewTable.jsx
import React from "react";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import ActionMenu from "../../../common/components/ActionMenu";

export default function CrewTable({ crews, loading, onDelete, onEdit, onView }) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="overflow-x-auto">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-200 text-sm font-semibold text-text-main">
            <th className="px-4 py-3 whitespace-nowrap">{t("no") || "No"}</th>
            <th className="px-4 py-3 whitespace-nowrap">
              {t("boarding_vessel") || "Boarding Vessel"}
            </th>
            <th className="px-4 py-3 whitespace-nowrap">{t("rank") || "Rank"}</th>
            <th className="px-4 py-3 whitespace-nowrap">
              {t("seaman_code") || "Seaman Code"}
            </th>
            <th className="px-4 py-3 whitespace-nowrap">{t("name") || "Name"}</th>
            <th className="px-4 py-3 whitespace-nowrap">{t("validity") || "Validity"}</th>
            <th className="px-4 py-3 whitespace-nowrap">
              {t("division") || "Division"}
            </th>
            <th className="px-4 py-3 whitespace-nowrap">{t("type") || "Type"}</th>
            <th className="px-4 py-3 whitespace-nowrap">
              {t("remaining") || "Remaining"}
            </th>
            <th className="px-4 py-3 whitespace-nowrap text-center">
              {t("actions") || "Actions"}
            </th>
          </tr>
        </thead>
        <tbody>
          {crews.length === 0 ? (
            <tr>
              <td colSpan="10" className="px-4 py-8 text-center text-text-light">
                {t("no_data") || "No data found"}
              </td>
            </tr>
          ) : (
            crews.map((member, i) => (
              <tr
                key={member.id || i}
                className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                <td className="px-4 py-3 text-sm text-text-dark">
                  {member.no || String(i + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-3 text-sm text-text-dark">
                  {member.vessel || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-text-dark">
                  {member.rank || "-"}
                </td>
                <td className="px-4 py-3 text-sm font-mono text-text-dark">
                  {member.seamanCode || member.crewCode || "-"}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-text-dark">
                  {member.name || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-text-dark max-w-[120px] truncate">
                  {member.validity || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-text-dark">
                  {member.division || "-"}
                </td>
                <td className="px-4 py-3 text-sm text-text-dark">
                  {member.type || member.rank || "-"}
                </td>
                <td
                  className={`px-4 py-3 text-sm font-semibold ${
                    member.remaining < 0 || (member.remaining !== undefined && member.remaining < 0)
                      ? "text-accent-red"
                      : "text-text-dark"
                  }`}
                >
                  {member.remaining !== undefined ? member.remaining : "-"}
                </td>
                <td className="px-4 py-3 text-center">
                  <ActionMenu
                    crewId={member.id}
                    onDelete={() => onDelete(member.id)}
                    onEdit={() => onEdit(member.id)}
                    onView={() => onView(member.id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}