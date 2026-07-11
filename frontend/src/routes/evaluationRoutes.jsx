// src/routes/evaluationRoutes.jsx
import EvaluationListPage from "../features/evaluation/pages/EvaluationListPage";
import EvaluationCreatePage from "../features/evaluation/pages/EvaluationCreatePage";
import EvaluationEditPage from "../features/evaluation/pages/EvaluationEditPage";

const evaluationRoutes = [
  { path: "crew/evaluation", element: <EvaluationListPage /> },
  { path: "crew/evaluation/new", element: <EvaluationCreatePage /> },
  { path: "crew/evaluation/:id", element: <EvaluationEditPage /> },
  { path: "crew/evaluation/:id/edit", element: <EvaluationEditPage /> },
];

export default evaluationRoutes;

