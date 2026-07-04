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
import SummaryCard from "../../components/ui/SummaryCard";
import ActionMenu from "../../components/ui/ActionMenu";
import { useCrew } from "../../context/CrewContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function CrewList() {
  const navigate = useNavigate();
  const { crews, loading, totalCrews, pagination, fetchCrews, deleteCrew } =
    useCrew();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isSearching) {
      fetchCrews(currentPage, 20, selectedRank);
    }
  }, [currentPage, selectedRank]);

  const handleDelete = async (id) => {
    const success = await deleteCrew(id);
    if (success) fetchCrews(currentPage, 20, selectedRank);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      fetchCrews(0, 20, selectedRank, searchTerm);
    } else {
      setIsSearching(false);
      fetchCrews(currentPage, 20, selectedRank);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsSearching(false);
    fetchCrews(currentPage, 20, selectedRank);
  };

  if (loading && crews.length === 0) return <LoadingSpinner />;

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-full mx-auto px-2 sm:px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-medium text-text-main">
            Crew Management
          </h1>
          <p className="text-xs sm:text-sm text-text-light">
            Total: {totalCrews} crew members
          </p>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md border border-brand text-text-main hover:bg-brand-lighter transition-colors text-xs sm:text-sm font-medium">
            <Download size={14} className="sm:w-4 sm:h-4" /> Export
          </button>
          <button
            onClick={() => navigate("/crew/new")}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-brand-dark text-white hover:bg-brand transition-colors text-xs sm:text-sm font-medium"
          >
            <Plus size={14} className="sm:w-4 sm:h-4" /> Add New
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-3 sm:p-4 rounded-md border border-gray-200 shadow-card">
        <div className="flex-1 min-w-[150px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
          <input
            type="text"
            placeholder="Search by name, code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedRank}
            onChange={(e) => {
              setSelectedRank(e.target.value);
              setCurrentPage(0);
            }}
            className="flex-1 sm:flex-none px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand/20 bg-white"
          >
            <option value="">All Ranks</option>
            <option value="Chief Officer">Chief Officer</option>
            <option value="Able Seaman">Able Seaman</option>
            <option value="3rd Officer">3rd Officer</option>
            <option value="Engine">Engine</option>
            <option value="Deck">Deck</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-brand transition-colors text-sm"
          >
            Search
          </button>
          {isSearching && (
            <button
              onClick={handleClearSearch}
              className="px-3 py-2 text-sm text-text-light hover:text-text-main transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-md border border-gray-200 shadow-card overflow-hidden">
        <div className="sm:hidden divide-y divide-gray-100">
          {crews.map((member) => (
            <div
              key={member.crew_code || member.id}
              onClick={() => navigate(`/crew/${member.crew_code || member.id}`)}
              className="p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">
                    {member.name_kor || member.name}
                  </div>
                  <div className="text-xs text-text-light">{member.rank}</div>
                  <div className="text-xs text-text-light">
                    {member.vessel || "-"}
                  </div>
                  <div className="text-xs font-mono text-text-light mt-1">
                    {member.crew_code || member.id}
                  </div>
                </div>
                <div onClick={(e) => e.stopPropagation()}>
                  <ActionMenu
                    crewId={member.crew_code || member.id}
                    onDelete={handleDelete}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[768px]">
            <thead>
              <tr className="bg-brand-lighter/60 border-b border-gray-200 text-xs lg:text-sm font-medium text-black">
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap">#</th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap">Code</th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap">Name</th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap hidden md:table-cell">
                  Rank
                </th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap hidden lg:table-cell">
                  Vessel
                </th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap hidden xl:table-cell">
                  Nationality
                </th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap hidden 2xl:table-cell">
                  Phone
                </th>
                <th className="px-3 py-3 lg:px-4 whitespace-nowrap text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {crews.map((member, i) => (
                <tr
                  key={member.crew_code || member.id}
                  onClick={() =>
                    navigate(`/crew/${member.crew_code || member.id}`)
                  }
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                    i % 2 === 1 ? "bg-surface-alt" : "bg-white"
                  }`}
                >
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm text-text-dark">
                    {i + 1 + currentPage * 20}
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm font-mono text-text-dark">
                    {member.crew_code || member.id}
                  </td>
                  <td className="px-3 py-3 lg:px-4">
                    <div className="text-xs lg:text-sm font-medium">
                      {member.name_kor || member.name}
                    </div>
                    <div className="text-[10px] lg:text-xs text-text-light">
                      {member.name_eng || ""}
                    </div>
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm text-text-dark hidden md:table-cell">
                    {member.rank}
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm text-text-dark hidden lg:table-cell">
                    {member.vessel || "-"}
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm text-text-dark hidden xl:table-cell">
                    {member.nationality || "Myanmar"}
                  </td>
                  <td className="px-3 py-3 lg:px-4 text-xs lg:text-sm text-text-dark hidden 2xl:table-cell">
                    {member.phone || "-"}
                  </td>
                  <td
                    className="px-3 py-3 lg:px-4 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ActionMenu
                      crewId={member.crew_code || member.id}
                      onDelete={handleDelete}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {crews.length === 0 && !loading && (
          <div className="p-8 text-center text-text-light">
            <p>No crew members found</p>
          </div>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 p-3 sm:p-4 border-t border-gray-200">
          <button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1.5 rounded border border-gray-200 text-xs sm:text-sm text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="text-xs sm:text-sm text-text-light">
            {pagination.page + 1} / {pagination.totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(pagination.totalPages - 1, p + 1))
            }
            disabled={currentPage === pagination.totalPages - 1}
            className="px-3 py-1.5 rounded border border-gray-200 text-xs sm:text-sm text-text-main hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
