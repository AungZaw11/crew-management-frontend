// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { CrewProvider } from "./context/CrewContext";
import Layout from "./components/common/Layout";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/dashboard/Overview";
import CrewList from "./pages/crew/CrewList";
import CrewCalendar from "./pages/dashboard/CrewCalendar";
import CrewDetail from "./pages/crew/CrewDetail";
import CrewCreate from "./pages/crew/CrewCreate";
import Payment from "./pages/payment/Payment";
import Settings from "./pages/settings/Settings";
import Register from "./pages/auth/Register";

// ===== TAB LIST COMPONENTS =====
import QualificationList from "./pages/crew/qualifications/QualificationList";
import AppointmentList from "./pages/crew/appointments/AppointmentList";
import ReplacementList from "./pages/crew/replacements/ReplacementList";
import PaymentList from "./pages/crew/payments/PaymentList";
import FamilyList from "./pages/crew/families/FamilyList";
import InjuryList from "./pages/crew/injuries/InjuryList";
import HealthList from "./pages/crew/health/HealthList";
import ExperienceList from "./pages/crew/experiences/ExperienceList";
import EvaluationList from "./pages/crew/evaluations/EvaluationList";
import AccidentList from "./pages/crew/accidents/AccidentList";

// ===== TAB CREATE COMPONENTS =====
import QualificationCreate from "./pages/crew/qualifications/QualificationCreate";
import AppointmentCreate from "./pages/crew/appointments/AppointmentCreate";
import ReplacementCreate from "./pages/crew/replacements/ReplacementCreate";
import PaymentCreate from "./pages/crew/payments/PaymentCreate";
import FamilyCreate from "./pages/crew/families/FamilyCreate";
import InjuryCreate from "./pages/crew/injuries/InjuryCreate";
import HealthCreate from "./pages/crew/health/HealthCreate";
import ExperienceCreate from "./pages/crew/experiences/ExperienceCreate";
import EvaluationCreate from "./pages/crew/evaluations/EvaluationCreate";
import AccidentCreate from "./pages/crew/accidents/AccidentCreate";

// ===== TAB EDIT COMPONENTS =====
import QualificationEdit from "./pages/crew/qualifications/QualificationEdit";
import AppointmentEdit from "./pages/crew/appointments/AppointmentEdit";
import ReplacementEdit from "./pages/crew/replacements/ReplacementEdit";
import PaymentEdit from "./pages/crew/payments/PaymentEdit";
import FamilyEdit from "./pages/crew/families/FamilyEdit";
import InjuryEdit from "./pages/crew/injuries/InjuryEdit";
import HealthEdit from "./pages/crew/health/HealthEdit";
import ExperienceEdit from "./pages/crew/experiences/ExperienceEdit";
import EvaluationEdit from "./pages/crew/evaluations/EvaluationEdit";
import AccidentEdit from "./pages/crew/accidents/AccidentEdit";

// ===== COMPONENT TO CHECK AUTH =====
function AppRoutes() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("🔍 AppRoutes - Token:", token ? "Present" : "Missing");
    console.log("🔍 AppRoutes - Current Path:", window.location.pathname);
    
    // If no token and not on login page, redirect to login
    if (!token && window.location.pathname !== "/login") {
      console.log("🔍 No token, redirecting to login");
      navigate("/login");
    }
  }, [token, navigate]);

  // If no token, show login
  if (!token) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />

      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/overview"
        element={
          <Layout>
            <Overview />
          </Layout>
        }
      />

      {/* ===== CREW ROUTES ===== */}
      <Route
        path="/crew"
        element={
          <Layout>
            <CrewList />
          </Layout>
        }
      />
      <Route
        path="/crew/calendar"
        element={
          <Layout>
            <CrewCalendar />
          </Layout>
        }
      />
      <Route
        path="/crew/new"
        element={
          <Layout>
            <CrewCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id"
        element={
          <Layout>
            <CrewDetail />
          </Layout>
        }
      />

      {/* ===== QUALIFICATION ROUTES ===== */}
      <Route
        path="/crew/:id/qualification"
        element={
          <Layout>
            <QualificationList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/qualification/new"
        element={
          <Layout>
            <QualificationCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/qualification/:itemId/edit"
        element={
          <Layout>
            <QualificationEdit />
          </Layout>
        }
      />

      {/* ===== APPOINTMENT ROUTES ===== */}
      <Route
        path="/crew/:id/appointment"
        element={
          <Layout>
            <AppointmentList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/appointment/new"
        element={
          <Layout>
            <AppointmentCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/appointment/:itemId/edit"
        element={
          <Layout>
            <AppointmentEdit />
          </Layout>
        }
      />

      {/* ===== REPLACEMENT ROUTES ===== */}
      <Route
        path="/crew/:id/replacement"
        element={
          <Layout>
            <ReplacementList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/replacement/new"
        element={
          <Layout>
            <ReplacementCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/replacement/:itemId/edit"
        element={
          <Layout>
            <ReplacementEdit />
          </Layout>
        }
      />

      {/* ===== PAYMENT ROUTES ===== */}
      <Route
        path="/crew/:id/payment"
        element={
          <Layout>
            <PaymentList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/payment/new"
        element={
          <Layout>
            <PaymentCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/payment/:itemId/edit"
        element={
          <Layout>
            <PaymentEdit />
          </Layout>
        }
      />

      {/* ===== FAMILY ROUTES ===== */}
      <Route
        path="/crew/:id/family"
        element={
          <Layout>
            <FamilyList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/family/new"
        element={
          <Layout>
            <FamilyCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/family/:itemId/edit"
        element={
          <Layout>
            <FamilyEdit />
          </Layout>
        }
      />

      {/* ===== INJURY ROUTES ===== */}
      <Route
        path="/crew/:id/injury"
        element={
          <Layout>
            <InjuryList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/injury/new"
        element={
          <Layout>
            <InjuryCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/injury/:itemId/edit"
        element={
          <Layout>
            <InjuryEdit />
          </Layout>
        }
      />

      {/* ===== HEALTH ROUTES ===== */}
      <Route
        path="/crew/:id/health"
        element={
          <Layout>
            <HealthList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/health/new"
        element={
          <Layout>
            <HealthCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/health/:itemId/edit"
        element={
          <Layout>
            <HealthEdit />
          </Layout>
        }
      />

      {/* ===== EXPERIENCE ROUTES ===== */}
      <Route
        path="/crew/:id/experience"
        element={
          <Layout>
            <ExperienceList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/experience/new"
        element={
          <Layout>
            <ExperienceCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/experience/:itemId/edit"
        element={
          <Layout>
            <ExperienceEdit />
          </Layout>
        }
      />

      {/* ===== EVALUATION ROUTES ===== */}
      <Route
        path="/crew/:id/evaluation"
        element={
          <Layout>
            <EvaluationList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/evaluation/new"
        element={
          <Layout>
            <EvaluationCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/evaluation/:itemId/edit"
        element={
          <Layout>
            <EvaluationEdit />
          </Layout>
        }
      />

      {/* ===== ACCIDENT ROUTES ===== */}
      <Route
        path="/crew/:id/accident"
        element={
          <Layout>
            <AccidentList />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/accident/new"
        element={
          <Layout>
            <AccidentCreate />
          </Layout>
        }
      />
      <Route
        path="/crew/:id/accident/:itemId/edit"
        element={
          <Layout>
            <AccidentEdit />
          </Layout>
        }
      />

      {/* ===== OTHER PAGES ===== */}
      <Route
        path="/payment"
        element={
          <Layout>
            <Payment />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <Settings />
          </Layout>
        }
      />
    </Routes>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <LanguageProvider>
      <CrewProvider>
        <AppRoutes />
      </CrewProvider>
    </LanguageProvider>
  );
}