// src/routes/familyRoutes.jsx
import FamilyListPage from "../features/family/pages/FamilyListPage";
import FamilyCreatePage from "../features/family/pages/FamilyCreatePage";
import FamilyEditPage from "../features/family/pages/FamilyEditPage";

const familyRoutes = [
  { path: "crew/family", element: <FamilyListPage /> },
  { path: "crew/family/new", element: <FamilyCreatePage /> },
  { path: "crew/family/:id/edit", element: <FamilyEditPage /> },
];

