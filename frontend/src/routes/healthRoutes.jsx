// src/routes/healthRoutes.jsx
import HealthListPage from "../features/health/pages/HealthListPage";
import HealthCreatePage from "../features/health/pages/HealthCreatePage";
import HealthEditPage from "../features/health/pages/HealthEditPage";

const healthRoutes = [
  { path: "crew/health", element: <HealthListPage /> },
  { path: "crew/health/new", element: <HealthCreatePage /> },
  { path: "crew/accident/:id", element: <HealthEditPage/>},
  { path: "crew/health/:id/edit", element: <HealthEditPage /> },
];

export default healthRoutes;


