import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Banner from "./components/Banner/Banner";
import Stone from "./components/Stone/Stone";
import Bhakti from "./components/Bhakti/Bhakti";
import AdminLogin from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminStudio from "./components/AdminStudio/AdminStudio";

function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Banner /><Home /></>} />
        <Route path="/stone-laying-ceremony" element={<Stone />} />
        <Route path="/bhakti-bhavna" element={<Bhakti />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- NESTED ADMIN ROUTES --- */}
        <Route path="/admin" element={<AdminDashboard />}>
          {/* This renders at /admin/dashboard */}
          <Route path="dashboard" element={
            <div style={{ padding: '40px', color: 'white' }}>
              <h1>Dashboard Overview</h1>
              <p>Welcome to the Executive Suite.</p>
            </div>
          } />
          
          {/* This renders at /admin/pages */}
          <Route path="pages" element={<AdminStudio />} />
        </Route>

        {/* Redirects */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        <Route path="*" element={
          <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <button onClick={() => window.location.href = '/'}>Go Home</button>
          </div>
        } />
      </Routes>
    </>
  );
}

export default App;