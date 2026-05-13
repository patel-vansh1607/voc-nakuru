import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { supabase } from "./supabaseClient"; 
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer"; // Import your new Footer
import Home from "./components/Home/Home";
import Banner from "./components/Banner/Banner";
import Stone from "./components/Stone/Stone";
import Bhakti from "./components/Bhakti/Bhakti";
import AdminLogin from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminStudio from "./components/AdminStudio/AdminStudio";
import Contact from "./components/Contact/Contact";

// --- PROTECTED ROUTE COMPONENT ---
const ProtectedRoute = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null;

  return session ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

function App() {
  const location = useLocation();
  // Check if we are in the admin panel
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Show Navbar only if NOT an admin page */}
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Banner /><Home /></>} />
        <Route path="/stone-laying-ceremony" element={<Stone />} />
        <Route path="/bhakti-bhavna" element={<Bhakti />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Admin Login */}
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

        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        
        <Route path="*" element={
          <div style={{ color: 'white', padding: '100px', textAlign: 'center' }}>
            <h2>404 - Page Not Found</h2>
            <button onClick={() => window.location.href = '/'}>Go Home</button>
          </div>
        } />
      </Routes>

      {/* --- ADD FOOTER HERE --- */}
      {/* This ensures the footer appears on all public pages, but stays away from the Admin UI */}
      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;