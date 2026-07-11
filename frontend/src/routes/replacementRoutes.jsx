// src/routes/replacementRoutes.jsx
import ReplacementListPage from "../features/replacement/pages/ReplacementListPage";
import ReplacementCreatePage from "../features/replacement/pages/ReplacementCreatePage";
import ReplacementEditPage from "../features/replacement/pages/ReplacementEditPage";

const replacementRoutes = [
  { path: "crew/:id/replacement", element: <ReplacementListPage /> },
  { path: "crew/:id/replacement/new", element: <ReplacementCreatePage /> },
  { path: "crew/:id/replacement/:itemId/edit", element: <ReplacementEditPage /> },
];

export default replacementRoutes;
