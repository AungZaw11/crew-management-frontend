// src/features/experience/components/ExperienceList.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLanguage } from "../../../common/hooks/LanguageContext";
import Table from "../../../common/components/Table/Table";
import TableActions from "../../../common/components/Table/TableActions";
import { deleteExperience } from "../services/experienceSlice";
import toastHelper from "../../../utils/toastHelper";

const MOCK_EXPERIENCES = [
  {
    id: 1,
    no: "01",
    company: "Sungan Shipping",
    shipName: "CS Crystal",
    rank: "Chief Officer",
    boardingDate: "2024-01-15",
    leavingDate: "2024-07-15",
    area: "Asia Pacific",
    shipType: "Container",
    board: "Sign On",
    leave: "Sign Off",
    remarks: "-",
  },
  {
    id: 2,
    no: "02",
    company: "Oceanic Lines",
    shipName: "MV Ocean Queen",
    rank: "Second Officer",
    boardingDate: "2023-06-10",
    leavingDate: "2023-12-20",
    area: "Europe",
    shipType: "Bulk Carrier",
    board: "Sign On",
    leave: "Sign Off",
    remarks: "Completed",
  },
  {
    id: 3,
    no: "03",
    company: "Sungan Shipping",
    shipName: "MV Pacific Star",
    rank: "Third Officer",
    boardingDate: "2023-01-05",
    leavingDate: "2023-06-30",
    area: "Americas",
    shipType: "Tanker",
    board: "Sign On",
    leave: "Sign Off",
    remarks: "-",
  },
];

export default function ExperienceList({ 
  experiences = [], 
  crewId, 
  isLoading = false,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useLanguage();
  const [selectedIds, setSelectedIds] = useState([]);
  
  // ✅ Filter state
  const [filterValue, setFilterValue] = useState("all");

  const displayData = experiences.length > 0 ? experiences : MOCK_EXPERIENCES;

  // ✅ Filter options
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "Sungan Shipping", label: "Sungan Shipping" },
    { value: "Oceanic Lines", label: "Oceanic Lines" },
    { value: "Chief Officer", label: "Chief Officer" },
    { value: "Second Officer", label: "Second Officer" },
    { value: "Third Officer", label: "Third Officer" },
  ];

  // ✅ Filter function
  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  // ✅ Filtered data
  const getFilteredData = () => {
    if (filterValue === "all") {
      return displayData;
    }
    return displayData.filter(item => 
      item.company === filterValue || 
      item.rank === filterValue
    );
  };

  const filteredData = getFilteredData();

  const handleDelete = async (id) => {
    if (window.confirm(t("confirm_delete") || "Are you sure?")) {
      try {
        await dispatch(deleteExperience(id)).unwrap();
        toastHelper.success("Deleted successfully!");
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleDeleteSelected = async (ids) => {
    if (window.confirm(t("confirm_delete_selected") || "Delete selected items?")) {
      try {
        for (const id of ids) {
          await dispatch(deleteExperience(id)).unwrap();
        }
        toastHelper.success("Selected items deleted!");
        setSelectedIds([]);
      } catch (error) {
        toastHelper.error(error.message || "Failed to delete");
      }
    }
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(item => item.id));
    }
  };

  const handleSelectRow = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item.id !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const columns = [
    { key: "no", label: "No", width: "60px" },
    { key: "company", label: "Company" },
    { key: "shipName", label: "Ship Name" },
    { key: "rank", label: "Rank" },
    { key: "boardingDate", label: "Boarding Date" },
    { key: "leavingDate", label: "Leaving Date" },
    { key: "area", label: "Area" },
    { key: "shipType", label: "Ship Type" },
    { key: "board", label: "Board" },
    { key: "leave", label: "Leave" },
    { key: "remarks", label: "Remarks" },
  ];

  const actions = {
    render: (item) => (
      <TableActions
        item={item}
        onView={() => navigate(`/crew/${crewId}/experience/${item.id}`)}
        onEdit={() => navigate(`/crew/${crewId}/experience/${item.id}/edit`)}
        onDelete={() => handleDelete(item.id)}
      />
    ),
  };

  return (
    <Table
      columns={columns}
      data={filteredData}
      actions={actions}
      isLoading={isLoading}
      emptyMessage="No experiences found"
      showCheckbox={true}
      selectedIds={selectedIds}
      onSelectAll={handleSelectAll}
      onSelectRow={handleSelectRow}
      onDeleteSelected={handleDeleteSelected}
      filterOptions={filterOptions}
      filterValue={filterValue}
      onFilterChange={handleFilterChange}
      filterLabel={t("filter_by") || "Filter by Company/Rank"}
    />
  );
}