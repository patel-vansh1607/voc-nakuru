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
import EventControlPage from "./components/EventController/EventController";

function App() {
  const location = useLocation();
  
  // Logic to hide Navbar on all admin-related routes
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Navbar only if NOT on an admin page */}
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <Home />
            </>
          } 
        />
        <Route path="/stone-laying-ceremony" element={<Stone />} />
        <Route path="/bhakti-bhavna" element={<Bhakti />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Routes 
          Note: AdminDashboard already has its own internal redirect logic 
          if the session is missing, so we keep these straightforward.
        */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* Redirects & Helpers */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        {/* Catch-all for 404s */}
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