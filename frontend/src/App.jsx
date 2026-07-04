// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CrewProvider } from "./context/CrewContext";
import Layout from "./components/common/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CrewList from "./pages/crew/CrewList";
import CrewProfile from "./pages/crew/CrewProfile";
import Dashboard from "./pages/dashboard/Dashboard";
import CrewCalendar from "./pages/dashboard/CrewCalendar";
import Payment from "./pages/payment/Payment";
import Settings from "./pages/settings/Settings";

export default function App() {
  const token = localStorage.getItem("token");

  console.log(" Token in App:", token);
  console.log("Current path:", window.location.pathname);

  if (!token) {
    console.log(" No token, showing Login");
    return <Login />;
  }

  console.log("Token found, showing Layout");

  return (
    <CrewProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/crew" replace />} />

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
              <CrewProfile />
            </Layout>
          }
        />
        <Route
          path="/crew/:id"
          element={
            <Layout>
              <CrewProfile />
            </Layout>
          }
        />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
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
          path="/payment"
          element={
            <Layout>
              <Payment />
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
  );
}
