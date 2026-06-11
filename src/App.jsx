import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Layout from './components/common/Layout';
import Overview from './pages/dashboard/Overview';
import CalendarView from './pages/dashboard/CalendarView';
import CrewManagement from './pages/crew/CrewManagement';

function App() {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Login />;
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/overview" />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/crew" element={<CrewManagement />} />
      </Route>
    </Routes>
  );
}

export default App;