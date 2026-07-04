// src/context/CrewContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { mockCrew } from "../data/mockData";

const CrewContext = createContext();

export const useCrew = () => {
  const context = useContext(CrewContext);
  if (!context) throw new Error("useCrew must be used within a CrewProvider");
  return context;
};

export const CrewProvider = ({ children }) => {
  const [crews, setCrews] = useState(mockCrew);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCrews, setTotalCrews] = useState(mockCrew.length);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
    totalPages: 0,
  });

  const fetchCrews = async (page = 0, size = 20, rank = "", keyword = "") => {
    setLoading(true);
    try {
      let filtered = [...mockCrew];
      if (rank) filtered = filtered.filter((c) => c.rank === rank);
      if (keyword) {
        filtered = filtered.filter(
          (c) =>
            c.name.toLowerCase().includes(keyword.toLowerCase()) ||
            c.seamanCode.toLowerCase().includes(keyword.toLowerCase()),
        );
      }
      setCrews(filtered);
      setTotalCrews(filtered.length);
      setPagination({
        page: page,
        size: size,
        totalPages: Math.ceil(filtered.length / size),
      });
      setError(null);
      toast.success("Crews loaded successfully");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch crews");
    } finally {
      setLoading(false);
    }
  };

  const getCrewById = async (id) => {
    const crew = mockCrew.find((c) => c.id === id || c.seamanCode === id);
    if (crew) return crew;
    toast.error("Crew not found");
    return null;
  };

  const addCrew = async (crewData) => {
    setLoading(true);
    try {
      const newCrew = {
        id: Date.now().toString(),
        no: String(mockCrew.length + 1).padStart(2, "0"),
        ...crewData,
        remaining: 0,
        status: "active",
      };
      setCrews([...crews, newCrew]);
      toast.success("✅ Crew created successfully");
      return newCrew;
    } catch (err) {
      toast.error("❌ Failed to create crew");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCrew = async (id, crewData) => {
    setLoading(true);
    try {
      const updated = crews.map((c) =>
        c.id === id ? { ...c, ...crewData } : c,
      );
      setCrews(updated);
      toast.success("✅ Crew updated successfully");
      return crewData;
    } catch (err) {
      toast.error("❌ Failed to update crew");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCrew = async (id) => {
    setLoading(true);
    try {
      const filtered = crews.filter((c) => c.id !== id);
      setCrews(filtered);
      toast.success("✅ Crew deleted successfully");
      return true;
    } catch (err) {
      toast.error("❌ Failed to delete crew");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrews();
  }, []);

  const value = {
    crews,
    loading,
    error,
    totalCrews,
    pagination,
    fetchCrews,
    getCrewById,
    addCrew,
    updateCrew,
    deleteCrew,
  };

  return <CrewContext.Provider value={value}>{children}</CrewContext.Provider>;
};
