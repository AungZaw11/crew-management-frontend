// src/routes/crewRoutes.jsx
import CrewListPage from "../features/crew/pages/CrewListPage";
import CrewCreatePage from "../features/crew/pages/CrewCreatePage";
import CrewDetailPage from "../features/crew/pages/CrewDetailPage";
import CrewCalendarPage from "../features/calendar/pages/CrewCalendarPage";

import QualificationCreatePage from "../features/qualification/pages/QualificationCreatePage";
import QualificationEditPage from "../features/qualification/pages/QualificationEditPage";
import QualificationDetailPage from "../features/qualification/pages/QualificationDetailPage";

import AppointmentListPage from "../features/appointment/pages/AppointmentListPage";
import AppointmentCreatePage from "../features/appointment/pages/AppointmentCreatePage";
import AppointmentDetailPage from "../features/appointment/pages/AppointmentDetailPage";
import AppointmentEditPage from "../features/appointment/pages/AppointmentEditPage";

import ReplacementListPage from "../features/replacement/pages/ReplacementListPage";
import ReplacementCreatePage from "../features/replacement/pages/ReplacementCreatePage";
import ReplacementDetailPage from "../features/replacement/pages/ReplacementDetailPage";
import ReplacementEditPage from "../features/replacement/pages/ReplacementEditPage";

import PaymentListPage from "../features/payment/pages/PaymentListPage";
import PaymentCreatePage from "../features/payment/pages/PaymentCreatePage";
import PaymentDetailPage from "../features/payment/pages/PaymentDetailPage";
import PaymentEditPage from "../features/payment/pages/PaymentEditPage";

import FamilyListPage from "../features/family/pages/FamilyListPage";
import FamilyCreatePage from "../features/family/pages/FamilyCreatePage";
import FamilyDetailPage from "../features/family/pages/FamilyDetailPage";
import FamilyEditPage from "../features/family/pages/FamilyEditPage";

import HealthPage from "../features/health/pages/HealthPage";
import HealthCreatePage from "../features/health/pages/HealthCreatePage";
import HealthEditPage from "../features/health/pages/HealthEditPage";
import HealthDetailPage from "../features/health/pages/HealthDetailPage";

import ExperienceListPage from "../features/experience/pages/ExperienceListPage";
import ExperienceCreatePage from "../features/experience/pages/ExperienceCreatePage";
import ExperienceEditPage from "../features/experience/pages/ExperienceEditPage";
import ExperienceDetailPage from "../features/experience/pages/ExperienceDetailPage";

const crewRoutes = [
  // ===== Crew Main Routes =====
  { path: "crew", element: <CrewListPage /> },
  { path: "crew/new", element: <CrewCreatePage /> },
  { path: "crew/:id", element: <CrewDetailPage /> },
  { path: "crew/:id/edit", element: <CrewCreatePage /> },
  { path: "crew/calendar", element: <CrewCalendarPage /> },

  // ===== Crew Detail - Tab Routes (View Mode) =====
  { path: "crew/:id/qualifications", element: <CrewDetailPage /> },
  { path: "crew/:id/appointment", element: <CrewDetailPage /> },
  { path: "crew/:id/replacement", element: <CrewDetailPage /> },
  { path: "crew/:id/payment", element: <CrewDetailPage /> },
  { path: "crew/:id/family", element: <CrewDetailPage /> },
  { path: "crew/:id/injury", element: <CrewDetailPage /> },
  { path: "crew/:id/experience", element: <CrewDetailPage /> },
  { path: "crew/:id/evaluation", element: <CrewDetailPage /> },
  { path: "crew/:id/accident", element: <CrewDetailPage /> },

  { path: "crew/:id/edit/qualifications", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/appointment", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/replacement", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/payment", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/family", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/injury", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/experience", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/evaluation", element: <CrewCreatePage /> },
  { path: "crew/:id/edit/accident", element: <CrewCreatePage /> },

  // ===== Qualification Routes =====
  { path: "crew/:crewId/qualification/new", element: <QualificationCreatePage /> },
  { path: "crew/:crewId/qualification/:id", element: <QualificationDetailPage /> },
  { path: "crew/:crewId/qualification/:id/edit", element: <QualificationEditPage /> },

  // ===== Appointment Routes =====
  { path: "crew/:crewId/appointment", element: <AppointmentListPage /> },
  { path: "crew/:crewId/appointment/new", element: <AppointmentCreatePage /> },
  { path: "crew/:crewId/appointment/:id", element: <AppointmentDetailPage /> },
  { path: "crew/:crewId/appointment/:id/edit", element: <AppointmentEditPage /> },

  // ===== Replacement Routes =====
  { path: "crew/:crewId/replacement", element: <ReplacementListPage /> },
  { path: "crew/:crewId/replacement/new", element: <ReplacementCreatePage /> },
  { path: "crew/:crewId/replacement/:id", element: <ReplacementDetailPage /> },
  { path: "crew/:crewId/replacement/:id/edit", element: <ReplacementEditPage /> },

  // ===== Payment Routes =====
  { path: "crew/:crewId/payment", element: <PaymentListPage /> },
  { path: "crew/:crewId/payment/new", element: <PaymentCreatePage /> },
  { path: "crew/:crewId/payment/:id", element: <PaymentDetailPage /> },
  { path: "crew/:crewId/payment/:id/edit", element: <PaymentEditPage /> },

  // ===== Family Routes =====
  { path: "crew/:crewId/family", element: <FamilyListPage /> },
  { path: "crew/:crewId/family/new", element: <FamilyCreatePage /> },
  { path: "crew/:crewId/family/:id", element: <FamilyDetailPage /> },
  { path: "crew/:crewId/family/:id/edit", element: <FamilyEditPage /> },

  // ===== Health Routes =====
  // List
  { path: "crew/:crewId/health", element: <HealthPage /> },
  { path: "crew/:crewId/health/injury", element: <HealthPage /> },
  { path: "crew/:crewId/health/medical-checkup", element: <HealthPage /> },
  { path: "crew/:crewId/health/disease", element: <HealthPage /> },

  // Create
  { path: "crew/:crewId/health/injury/new", element: <HealthCreatePage /> },
  { path: "crew/:crewId/health/medical-checkup/new", element: <HealthCreatePage /> },
  { path: "crew/:crewId/health/disease/new", element: <HealthCreatePage /> },

  // Detail
  { path: "crew/:crewId/health/injury/:id", element: <HealthDetailPage /> },
  { path: "crew/:crewId/health/medical-checkup/:id", element: <HealthDetailPage /> },
  { path: "crew/:crewId/health/disease/:id", element: <HealthDetailPage /> },

  // Edit
  { path: "crew/:crewId/health/injury/:id/edit", element: <HealthEditPage /> },
  { path: "crew/:crewId/health/medical-checkup/:id/edit", element: <HealthEditPage /> },
  { path: "crew/:crewId/health/disease/:id/edit", element: <HealthEditPage /> },

{ path: "crew/:crewId/experience", element: <ExperienceListPage /> },

  // Create
  { path: "crew/:crewId/experience/new", element: <ExperienceCreatePage /> },

  // Detail
  { path: "crew/:crewId/experience/:id", element: <ExperienceDetailPage /> },

  // Edit
  { path: "crew/:crewId/experience/:id/edit", element: <ExperienceEditPage /> },

];

export default crewRoutes;