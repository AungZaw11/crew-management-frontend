// src/routes/appointmentRoutes.jsx
import AppointmentListPage from "../features/appointment/pages/AppointmentListPage";
import AppointmentCreatePage from "../features/appointment/pages/AppointmentCreatePage";
import AppointmentEditPage from "../features/appointment/pages/AppointmentEditPage";

const appointmentRoutes = [
  { path: "crew//appointment", element: <AppointmentListPage /> },
  { path: "crew/appointment/new", element: <AppointmentCreatePage /> },
  { path: "crew/appontmnent/:id", element: <AccidentEditPage /> },
  { path: "crew/appointment/:id/edit", element: <AppointmentEditPage /> },
];

