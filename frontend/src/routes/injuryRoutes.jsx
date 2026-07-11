// src/routes/injuryRoutes.jsx
import InjuryListPage from "../features/injury/pages/InjuryListPage";
import InjuryCreatePage from "../features/injury/pages/InjuryCreatePage";
import InjuryEditPage from "../features/injury/pages/InjuryEditPage";

const injuryRoutes = [
  { path: "crew/injury", element: <InjuryListPage /> },
  { path: "crew/injury/new", element: <InjuryCreatePage /> },
  {path : "crew/injury/:id", element: <InjuryEditPage />},
  { path: "crew/:id/injury/:itemId/edit", element: <InjuryEditPage /> },
];

export default injuryRoutes;


export default appointmentRoutes;
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