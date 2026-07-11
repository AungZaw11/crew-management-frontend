// src/routes/crewRoutes.jsx
import CrewListPage from "../features/crew/pages/CrewListPage";
import CrewCreatePage from "../features/crew/pages/CrewCreatePage";
import CrewDetailPage from "../features/crew/pages/CrewDetailPage";
import CrewCalendarPage from "../features/calendar/pages/CrewCalendarPage";

const crewRoutes = [
  { path: "crew", element: <CrewListPage /> },
  { path: "crew/new", element: <CrewCreatePage /> },
  { path: "crew/:id", element: <CrewDetailPage /> },
  { path: "crew/:id/edit", element: <CrewCreatePage /> },
  { path: "crew/calendar", element: <CrewCalendarPage /> },
];

export default crewRoutes;