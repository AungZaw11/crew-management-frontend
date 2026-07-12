// src/routes/crewRoutes.jsx
import CrewListPage from "../features/crew/pages/CrewListPage";
import CrewCreatePage from "../features/crew/pages/CrewCreatePage";
import CrewDetailPage from "../features/crew/pages/CrewDetailPage";
import CrewCalendarPage from "../features/calendar/pages/CrewCalendarPage";

import QualificationCreatePage from "../features/qualification/pages/QualificationCreatePage";
import QualificationEditPage from "../features/qualification/pages/QualificationEditPage";
import QualificationDetailPage from "../features/qualification/pages/QualificationDetailPage";

const crewRoutes = [
  // ===== Crew Main Routes =====
  { path: "crew", element: <CrewListPage /> },
  { path: "crew/new", element: <CrewCreatePage /> },
  { path: "crew/:id", element: <CrewDetailPage /> },
  { path: "crew/:id/edit", element: <CrewCreatePage /> },
  { path: "crew/calendar", element: <CrewCalendarPage /> },

  // ===== Crew Detail - Tab Routes (View Mode) =====
  { path: "crew/:id/qualifications", element: <CrewDetailPage /> },
  { path: "crew/:id/appointment", element: <CrewDetailPage /> },
  { path: "crew/:id/replacement", element: <CrewDetailPage /> },
  { path: "crew/:id/payment", element: <CrewDetailPage /> },
  { path: "crew/:id/family", element: <CrewDetailPage /> },
  { path: "crew/:id/injury", element: <CrewDetailPage /> },
  { path: "crew/:id/health", element: <CrewDetailPage /> },
  { path: "crew/:id/experience", element: <CrewDetailPage /> },
  { path: "crew/:id/evaluation", element: <CrewDetailPage /> },
  { path: "crew/:id/accident", element: <CrewDetailPage /> },

  // ===== Crew Edit - Tab Routes (Edit Mode) =====
  { path: "crew/:id/edit/qualifications", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/appointment", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/replacement", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/payment", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/family", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/injury", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/health", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/experience", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/evaluation", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/accident", element: <CrewCreatePage /> },

  // ===== Qualification Routes (Nested under crew) =====
  { path: "crew/:crewId/qualification/new", element: <QualificationCreatePage /> },
  { path: "crew/:crewId/qualification/:id", element: <QualificationDetailPage /> },
  { path: "crew/:crewId/qualification/:id/edit", element: <QualificationEditPage /> },
];

export default crewRoutes;