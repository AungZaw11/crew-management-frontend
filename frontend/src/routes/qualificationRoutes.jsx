// src/routes/qualificationRoutes.jsx
import QualificationListPage from "../features/qualification/pages/QualificationListPage";
import QualificationCreatePage from "../features/qualification/pages/QualificationCreatePage";
import QualificationEditPage from "../features/qualification/pages/QualificationEditPage";

const qualificationRoutes = [
  { path: "crew/qualification", element: <QualificationListPage /> },
  { path: "crew/qualification/new", element: <QualificationCreatePage /> },
  { path: "crew/qualification/:id", element: <QualificationEditPage /> },
  { path: "crew/qualification/:id/edit", element: <QualificationEditPage /> },
];

export default qualificationRoutes;