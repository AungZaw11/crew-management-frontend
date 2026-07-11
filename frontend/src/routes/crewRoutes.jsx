// src/routes/crewRoutes.jsx
import CrewListPage from "../features/crew/pages/CrewListPage";
import CrewCreatePage from "../features/crew/pages/CrewCreatePage";
import CrewDetailPage from "../features/crew/pages/CrewDetailPage";
import CrewCalendarPage from "../features/calendar/pages/CrewCalendarPage";

import QualificationCreatePage from "../features/qualification/pages/QualificationCreatePage";
import QualificationEditPage from "../features/qualification/pages/QualificationEditPage";
import QualificationDetailPage from "../features/qualification/pages/QualificationDetailPage";

const crewRoutes = [
  { path: "crew", element: <CrewListPage /> },
  { path: "crew/new", element: <CrewCreatePage /> },          // Create Mode
  { path: "crew/:id", element: <CrewDetailPage /> },          // Detail View
  { path: "crew/:id/edit", element: <CrewCreatePage /> },    // ✅ Edit Mode
  { path: "crew/calendar", element: <CrewCalendarPage /> },

  { path: "crew/:crewId/qualification/new", element: <QualificationCreatePage /> },
  { path: "crew/:crewId/qualification/:id", element: <QualificationDetailPage /> },
  { path: "crew/:crewId/qualification/:id/edit", element: <QualificationEditPage /> },
  
];

export default crewRoutes;




