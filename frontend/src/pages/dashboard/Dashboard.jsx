// src/pages/crew/CrewList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Download,
  Plus,
  ChevronDown,
  List,
  Calendar,
  CheckSquare,
  Search,
} from "lucide-react";
import { useCrew } from "../../context/CrewContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function CrewList() {
  const navigate = useNavigate();
  const { crews, loading, totalCrews, pagination, fetchCrews, deleteCrew } =
    useCrew();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchCrews(currentPage, 20, selectedRank);
  }, [currentPage, selectedRank]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {/* Header - Overview */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-text-main">Overview</h1>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md border border-brand text-text-main hover:bg-brand-lighter transition-colors text-sm font-medium">
            <Download size={16} /> Export
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-sm font-medium"
          >
            <Plus size={16} /> Add Crew
          </button>
        </div>
      </div>

      {/* Summary Cards - Certificate, Contract, PPT */}
      <div className="flex gap-6 overflow-x-auto pb-2">
        {/* Certificate */}
        <div className="bg-white rounded-md border border-gray-200 p-6 shadow-card flex flex-col gap-4 flex-1 min-w-[300px]">
          <div className="flex justify-between items-center">
            <h3 className="text-brand font-semibold text-lg">Certificate</h3>
            <button className="text-brand-light text-sm font-medium hover:underline">
              See All →
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-b from-surface-alt to-brand-lighter rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">72</span>
              <span className="text-accent-red font-bold text-xl mt-1">
                Expire
              </span>
            </div>
            <div className="flex-1 bg-surface-alt rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">24</span>
              <span className="text-accent-orange font-bold text-xl mt-1">
                30 Days
              </span>
            </div>
          </div>
        </div>

        {/* Contract */}
        <div className="bg-white rounded-md border border-gray-200 p-6 shadow-card flex flex-col gap-4 flex-1 min-w-[300px]">
          <div className="flex justify-between items-center">
            <h3 className="text-brand font-semibold text-lg">Contract</h3>
            <button className="text-brand-light text-sm font-medium hover:underline">
              See All →
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-b from-surface-alt to-brand-lighter rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">72</span>
              <span className="text-accent-red font-bold text-xl mt-1">
                Expire
              </span>
            </div>
            <div className="flex-1 bg-surface-alt rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">24</span>
              <span className="text-accent-orange font-bold text-xl mt-1">
                30 Days
              </span>
            </div>
          </div>
        </div>

        {/* PPT */}
        <div className="bg-white rounded-md border border-gray-200 p-6 shadow-card flex flex-col gap-4 flex-1 min-w-[300px]">
          <div className="flex justify-between items-center">
            <h3 className="text-brand font-semibold text-lg">PPT</h3>
            <button className="text-brand-light text-sm font-medium hover:underline">
              See All →
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 bg-gradient-to-b from-surface-alt to-brand-lighter rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">72</span>
              <span className="text-accent-red font-bold text-xl mt-1">
                Expire
              </span>
            </div>
            <div className="flex-1 bg-surface-alt rounded border border-gray-200 p-4 flex flex-col items-center justify-center">
              <span className="text-text-main text-sm font-medium">24</span>
              <span className="text-accent-orange font-bold text-xl mt-1">
                30 Days
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-md border border-gray-200 shadow-card flex flex-col">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-surface-alt rounded-t-md">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Vessel's Name</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Rank</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">
                2026-03-07 - 2026-07-31
              </span>
              <Calendar size={14} className="text-text-main" />
            </div>
          </div>

          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
              <CheckSquare size={18} className="text-text-main" />
              <span className="text-sm text-text-main">
                Include the employee Period Contract
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button className="p-2 rounded bg-text-main text-white">
                <List size={18} />
              </button>
              <button
                onClick={() => navigate("/crew/calendar")}
                className="p-2 rounded border border-text-main text-text-main hover:bg-gray-50 transition-colors"
              >
                <Calendar size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-lighter/60 border-b border-gray-200 text-sm font-medium text-black">
                <th className="px-4 py-4 whitespace-nowrap">No</th>
                <th className="px-4 py-4 whitespace-nowrap">Boarding Vessel</th>
                <th className="px-4 py-4 whitespace-nowrap">Rank</th>
                <th className="px-4 py-4 whitespace-nowrap">Seaman Code</th>
                <th className="px-4 py-4 whitespace-nowrap">Name</th>
                <th className="px-4 py-4 whitespace-nowrap">Validity</th>
                <th className="px-4 py-4 whitespace-nowrap">Division</th>
                <th className="px-4 py-4 whitespace-nowrap">Type</th>
                <th className="px-4 py-4 whitespace-nowrap">Remaining</th>
                <th className="px-4 py-4 whitespace-nowrap text-center">
                  Note
                </th>
              </tr>
            </thead>
            <tbody>
              {crews.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="px-4 py-8 text-center text-text-light"
                  >
                    No crew members found
                  </td>
                </tr>
              ) : (
                crews.map((member, i) => (
                  <tr
                    key={member.id}
                    onClick={() => navigate(`/crew/${member.id}`)}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                      i % 2 === 1 ? "bg-surface-alt" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.no || String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.vessel || "-"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.rank}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.seamanCode || member.crew_code}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.name}
                    </td>
                    <td
                      className="px-4 py-4 text-sm text-text-dark max-w-[150px] truncate"
                      title={member.validity}
                    >
                      {member.validity || "Major Requirements"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.division || "Passport"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.type || member.rank}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm font-medium ${member.remaining < 0 ? "text-accent-red" : "text-text-dark"}`}
                    >
                      {member.remaining || 0}
                    </td>
                    <td className="px-4 py-4 text-sm text-center">
                      {member.note || "CRP"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 flex justify-end items-center gap-2 border-t border-gray-200">
          <button
            className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            &lt;
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-brand-light text-white font-medium">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-text-dark font-medium">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-text-dark font-medium">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-50 text-text-dark font-medium">
            99
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-text-dark hover:bg-gray-50">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
