import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import { supabase } from "./supabaseClient"; 
import "./App.css";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Banner from "./components/Banner/Banner";
import Golden from "./components/Golden/Golden"; // Imported Golden component
import Stone from "./components/Stone/Stone";
import Bhakti from "./components/Bhakti/Bhakti";
import AdminLogin from "./components/Login/Login";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminStudio from "./components/AdminStudio/AdminStudio";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound.js/NotFound";

// --- NEW: PAGE TITLE & SCROLL MANAGER ---
const RouteManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Handle Scroll to Top
    window.scrollTo(0, 0);

    // 2. Handle Dynamic Page Titles
    const titles = {
      "/": "Home | Home",
      "/the-golden-jubilee": "The Golden Jubilee", // Added title for Golden route
      "/stone-laying-ceremony": "Stone Laying Ceremony",
      "/bhakti-bhavna": "Bhakti Bhavna Event",
      "/contact": "Contact Us",
      "/admin/login": "Admin Login",
      "/admin/dashboard": "Executive Dashboard",
      "/admin/pages": "Admin Studio",
    };

    // Default title for 404 or missing routes
    document.title = titles[pathname] || "Page Not Found";
  }, [pathname]);

  return null;
};

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
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Manages both Scroll and Document Title */}
      <RouteManager />

      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<><Banner /><Home /></>} />
        <Route path="/the-golden-jubilee" element={<Golden />} /> {/* Added Golden route */}
        <Route path="/stone-laying-ceremony" element={<Stone />} />
        <Route path="/bhakti-bhavna" element={<Bhakti />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/admin/login" element={<AdminLogin />} />

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
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;