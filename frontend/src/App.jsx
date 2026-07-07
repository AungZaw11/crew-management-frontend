// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { CrewProvider } from './context/CrewContext';
import Layout from './components/common/Layout';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Overview from './pages/dashboard/Overview';
import CrewList from './pages/crew/CrewList';
import CrewCalendar from './pages/dashboard/CrewCalendar';
import CrewProfile from './pages/crew/CrewProfile';
import Payment from './pages/payment/Payment';
import Settings from './pages/settings/Settings';

export default function App() {
  const token = localStorage.getItem('token');

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
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/overview" element={<Layout><Overview /></Layout>} />
          <Route path="/crew" element={<Layout><CrewList /></Layout>} />
          <Route path="/crew/calendar" element={<Layout><CrewCalendar /></Layout>} />
          <Route path="/crew/new" element={<Layout><CrewProfile /></Layout>} />
          <Route path="/crew/:id" element={<Layout><CrewProfile /></Layout>} />
          <Route path="/payment" element={<Layout><Payment /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
        </Routes>
      </CrewProvider>
    </LanguageProvider>
  );
}