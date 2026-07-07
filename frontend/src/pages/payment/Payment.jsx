// src/pages/payment/Payment.jsx
import React, { useState } from "react";
import { CreditCard, Plus, Download, Filter, ChevronDown } from "lucide-react";

import { useLanguage } from "../../context/LanguageContext";

export default function Payment() {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  const recentPayments = [
    {
      id: 1,
      crewName: "Aung Ko Htet",
      rank: "Deck",
      vessel: "HS Glory",
      amount: "$4,500",
      date: "2026-10-15",
      status: "Paid",
    },
    {
      id: 2,
      crewName: "Mg Mg Lwin",
      rank: "Galley",
      vessel: "Ocean Star",
      amount: "$3,800",
      date: "2026-10-15",
      status: "Paid",
    },
    {
      id: 3,
      crewName: "Htoo Htoo",
      rank: "Engine",
      vessel: "CS Crystal",
      amount: "$4,200",
      date: "2026-10-14",
      status: "Pending",
    },
    {
      id: 4,
      crewName: "Ye Phyo Win",
      rank: "Deck",
      vessel: "Ocean Star",
      amount: "$3,600",
      date: "2026-10-14",
      status: "Paid",
    },
    {
      id: 5,
      crewName: "Kyaw Zin",
      rank: "Engine",
      vessel: "HS Glory",
      amount: "$5,100",
      date: "2026-10-13",
      status: "Overdue",
    },
  ];

  const getStatusColor = (status) => {
    const colors = {
      Paid: "text-accent-green bg-green-50",
      Pending: "text-accent-orange bg-orange-50",
      Overdue: "text-accent-red bg-red-50",
    };
    return colors[status] || "text-gray-500 bg-gray-50";
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-full mx-auto px-2 sm:px-4">
      <div className="flex flex-wrap justify-between items-center gap-3">
        <h1 className="text-lg sm:text-xl font-medium text-text-main">
          Payroll & Payments
        </h1>
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-gray-200 text-text-main hover:bg-gray-50 transition-colors text-xs sm:text-sm font-medium">
            <Download size={14} className="sm:w-4 sm:h-4" /> Export
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-xs sm:text-sm font-medium">
            <Plus size={14} className="sm:w-4 sm:h-4" /> Process Payroll
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-text-light text-[10px] sm:text-sm font-medium mb-1">
            Next Payroll
          </h3>
          <p className="text-base sm:text-2xl font-bold text-text-main">
            Oct 31, 2026
          </p>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-text-light text-[10px] sm:text-sm font-medium mb-1">
            Total Processed
          </h3>
          <p className="text-base sm:text-2xl font-bold text-text-main">
            $1,245,000
          </p>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-text-light text-[10px] sm:text-sm font-medium mb-1">
            Pending Approvals
          </h3>
          <p className="text-base sm:text-2xl font-bold text-accent-orange">
            12
          </p>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 sm:p-6 shadow-card hover:shadow-lg transition-shadow">
          <h3 className="text-text-light text-[10px] sm:text-sm font-medium mb-1">
            Total on Payroll
          </h3>
          <p className="text-base sm:text-2xl font-bold text-text-main">174</p>
        </div>
      </div>

      <div className="bg-white rounded-md border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-surface-alt border-b border-gray-200 text-xs sm:text-sm font-medium text-text-main">
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">
                  #
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">
                  Crew Name
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap hidden sm:table-cell">
                  Rank
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap hidden md:table-cell">
                  Vessel
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap">
                  Amount
                </th>
                <th className="px-3 py-2 sm:px-6 sm:py-3 whitespace-nowrap hidden xs:table-cell">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-text-dark">
                    {String(payment.id).padStart(2, "0")}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-text-dark font-medium">
                    {payment.crewName}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-text-dark hidden sm:table-cell">
                    {payment.rank}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm text-text-dark hidden md:table-cell">
                    {payment.vessel}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium text-text-dark">
                    {payment.amount}
                  </td>
                  <td className="px-3 py-2 sm:px-6 sm:py-3 hidden xs:table-cell">
                    <span
                      className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
