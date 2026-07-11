// src/features/calendar/hooks/useCalendar.js
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCalendarData } from "../services/calendarSlice";

// ===== MOCK EVENTS =====
const MOCK_EVENTS = {
  "07": [
    { id: 1, name: "Aung Ko Htet", type: "disembark", rank: "Chief Officer" },
    { id: 2, name: "Mg Mg Lwin", type: "disembark", rank: "Engineer" },
    { id: 3, name: "Htoo Htoo", type: "disembark", rank: "Able Seaman" },
  ],
  "15": [
    { id: 4, name: "Ye Phyo Win", type: "embark", rank: "2nd Officer" },
  ],
  "23": [
    { id: 5, name: "Kyaw Zin", type: "embark", rank: "Chief Engineer" },
    { id: 6, name: "Nay Lin", type: "certificate", rank: "Boatswain" },
  ],
  "30": [
    { id: 7, name: "Aung Ko Htet", type: "contract", rank: "Chief Officer" },
  ],
};

export const useCalendar = () => {
  const dispatch = useDispatch();
  const { calendarData, isLoading } = useSelector((state) => state.calendar || {});
  
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return now.toLocaleString("default", { month: "long", year: "numeric" });
  });
  
  const [selectedVessel, setSelectedVessel] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return `${firstDay.toISOString().split('T')[0]} - ${lastDay.toISOString().split('T')[0]}`;
  });
  const [includeContract, setIncludeContract] = useState(false);
  const [viewMode, setViewMode] = useState("calendar");

  // Load calendar data
  useEffect(() => {
    dispatch(fetchCalendarData({
      month: currentMonth,
      vessel: selectedVessel,
      rank: selectedRank,
    }));
  }, [dispatch, currentMonth, selectedVessel, selectedRank]);

  // Generate calendar data
  const calendarDataWithEvents = useMemo(() => {
    if (calendarData && calendarData.length > 0) {
      return calendarData;
    }

    // ===== MOCK DATA GENERATION =====
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const today = new Date();
    
    const days = [];
    const totalDays = lastDayOfMonth.getDate();
    
    // Get first day of week (Monday = 1)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i > 0; i--) {
      const date = prevMonthLastDay - i + 1;
      days.push({
        date: String(date).padStart(2, '0'),
        isOtherMonth: true,
        isToday: false,
        events: [],
        eventCount: 0,
      });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = String(i).padStart(2, '0');
      const events = MOCK_EVENTS[dateStr] || [];
      const isToday = i === today.getDate() && 
                      month === today.getMonth() && 
                      year === today.getFullYear();
      
      days.push({
        date: dateStr,
        isOtherMonth: false,
        isToday: isToday,
        events: events,
        eventCount: events.length,
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: String(i).padStart(2, '0'),
        isOtherMonth: true,
        isToday: false,
        events: [],
        eventCount: 0,
      });
    }
    
    return days;
  }, [calendarData]);

  const handlePrevMonth = useCallback(() => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() - 1);
    setCurrentMonth(date.toLocaleString("default", { month: "long", year: "numeric" }));
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    const date = new Date(currentMonth);
    date.setMonth(date.getMonth() + 1);
    setCurrentMonth(date.toLocaleString("default", { month: "long", year: "numeric" }));
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    const now = new Date();
    setCurrentMonth(now.toLocaleString("default", { month: "long", year: "numeric" }));
  }, []);

  return {
    currentMonth,
    setCurrentMonth,
    selectedVessel,
    setSelectedVessel,
    selectedRank,
    setSelectedRank,
    dateRange,
    setDateRange,
    includeContract,
    setIncludeContract,
    viewMode,
    setViewMode,
    calendarData: calendarDataWithEvents,
    isLoading,
    handlePrevMonth,
    handleNextMonth,
    goToToday,
  };
};