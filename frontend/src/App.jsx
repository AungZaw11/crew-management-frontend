// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import QualificationForm from "./pages/crew/forms/QualificationForm";
import AppointmentForm from "./pages/crew/forms/AppointmentForm";

export default function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <LanguageProvider>
        <Login />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <CrewProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

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

          {/* Crew Routes */}
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

          {/* Add New Crew - No tabs, just Personal Info Form */}
          <Route
            path="/crew/new"
            element={
              <Layout>
                <CrewCreate />
              </Layout>
            }
          />
          <Route
            path="/crew/:id/qualification/new"
            element={
              <Layout>
                <QualificationForm />
              </Layout>
            }
          />
          <Route
            path="/crew/:id/appointment/new"
            element={
              <Layout>
                <AppointmentForm />
              </Layout>
            }
          />

          {/* Crew Detail - With all tabs */}
          <Route
            path="/crew/:id"
            element={
              <Layout>
                <CrewDetail />
              </Layout>
            }
          />

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
      </CrewProvider>
    </LanguageProvider>
  );
}
