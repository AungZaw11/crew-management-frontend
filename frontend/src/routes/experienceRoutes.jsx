// src/routes/experienceRoutes.jsx
import ExperienceListPage from "../features/experience/pages/ExperienceListPage";
import ExperienceCreatePage from "../features/experience/pages/ExperienceCreatePage";
import ExperienceEditPage from "../features/experience/pages/ExperienceEditPage";

const experienceRoutes = [
  { path: "crew/experience", element: <ExperienceListPage /> },
  { path: "crew/experience/new", element: <ExperienceCreatePage /> },
  { path: "crew/experience/:id", element: <ExperienceEditPage /> },
  { path: "crew/experience/:id/edit", element: <ExperienceEditPage /> },
];

export default experienceRoutes;