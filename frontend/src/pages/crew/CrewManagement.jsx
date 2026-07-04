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
  const { crews, loading, totalCrews, fetchCrews } = useCrew();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRank, setSelectedRank] = useState("");

  useEffect(() => {
    fetchCrews();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-6 max-w-[1440px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium text-text-main">Crew Management</h1>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-full bg-brand-lighter">
            <Users size={20} className="text-brand" />
          </div>
          <div>
            <p className="text-sm text-text-light">Total Crews</p>
            <p className="text-xl font-bold text-text-main">
              {totalCrews || 528}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-50">
            <Anchor size={20} className="text-accent-green" />
          </div>
          <div>
            <p className="text-sm text-text-light">On Board</p>
            <p className="text-xl font-bold text-text-main">528</p>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-50">
            <UserCheck size={20} className="text-brand-blue" />
          </div>
          <div>
            <p className="text-sm text-text-light">Active Crews</p>
            <p className="text-xl font-bold text-text-main">528</p>
          </div>
        </div>
        <div className="bg-white rounded-md border border-gray-200 p-4 shadow-card flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-50">
            <AlertCircle size={20} className="text-accent-orange" />
          </div>
          <div>
            <p className="text-sm text-text-light">Compliance Issues</p>
            <p className="text-xl font-bold text-text-main">24</p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-md border border-gray-200 shadow-card">
        <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 bg-surface-alt rounded-t-md">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Vessel's Name</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Crew Class</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Rank</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Sign On</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">Name</span>
              <ChevronDown size={14} className="text-text-main" />
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-md px-3 py-2 cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="text-sm text-text-main">
                2026-03-07 - 2026-07-31
              </span>
              <Calendar size={14} className="text-text-main" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer hover:text-brand transition-colors">
              <CheckSquare size={18} className="text-text-main" />
              <span className="text-sm text-text-main">
                Include Period Contract
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
                  Actions
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
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      i % 2 === 1 ? "bg-surface-alt" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.no || String(i + 1).padStart(2, "0")}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.vessel || "HS Glory"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.rank || "Deck"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.seamanCode || member.crew_code || "P006472"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.name || "Tun Tun"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark max-w-[150px] truncate">
                      {member.validity || "Major Requirements"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.division || "Passport"}
                    </td>
                    <td className="px-4 py-4 text-sm text-text-dark">
                      {member.type || member.rank}
                    </td>
                    <td
                      className={`px-4 py-4 text-sm font-medium ${
                        member.remaining < 0
                          ? "text-accent-red"
                          : "text-text-dark"
                      }`}
                    >
                      {member.remaining !== undefined
                        ? member.remaining
                        : "-459"}
                    </td>
                    <td className="px-4 py-4 text-sm text-center">
                      <button
                        onClick={() => navigate(`/crew/${member.id}`)}
                        className="text-brand-dark hover:underline font-medium text-sm"
                      >
                        View Details →
                      </button>
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
