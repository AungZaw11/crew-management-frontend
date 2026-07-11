// src/routes/accidentRoutes.jsx
import AccidentListPage from "../features/accident/pages/AccidentListPage";
import AccidentCreatePage from "../features/accident/pages/AccidentCreatePage";
import AccidentEditPage from "../features/accident/pages/AccidentEditPage";

const accidentRoutes = [
  { path: "crew/accident", element: <AccidentListPage /> },
  { path: "crew/accident/new", element: <AccidentCreatePage /> },
  { path: "crew/accident/:id", element: <AccidentEditPage /> },
  { path: "crew/accident/:id/edit", element: <AccidentEditPage /> },
];

export default accidentRoutes;