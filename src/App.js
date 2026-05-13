import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Ensure this path is correct
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

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null; // Or a loader

  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

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
        
        {/* Admin Login - Always Accessible */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* --- PROTECTED ADMIN ROUTES --- */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminDashboard />}>
            <Route path="dashboard" element={
              <div style={{ padding: '40px', color: 'white' }}>
                <h1>Dashboard Overview</h1>
                <p>Welcome to the Executive Suite.</p>
              </div>
            } />
            <Route path="pages" element={<AdminStudio />} />
          </Route>
        </Route>

        {/* Redirect base /admin to dashboard (if logged in) or login */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
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