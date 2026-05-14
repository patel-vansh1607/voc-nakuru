import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Ensure this is imported
import styles from './AdminDashboard.module.css';
import { LayoutDashboard, FileText, Settings, Layers, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // STRICT LOGOUT LOGIC
  const handleLogout = async () => {
    try {
      // 1. Kill session in Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;

      // 2. Clear any local storage leftovers just in case
      localStorage.clear();
      sessionStorage.clear();

      // 3. Force navigate to login and prevent "Back" button access
      navigate('/admin/login', { replace: true });
    } catch (err) {
      console.error("Logout failed:", err.message);
      // Fallback redirect
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo} onClick={() => navigate('/admin/dashboard')}>
          MINT
        </div>
        
        <div className={styles.navSection}>
          <p className={styles.navLabel}>General</p>
          <nav className={styles.navGroup}>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className={`${styles.navLink} ${isActive('/admin/dashboard') ? styles.active : ''}`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </button>
          </nav>
        </div>

        <div className={styles.navSection}>
          <p className={styles.navLabel}>Studio</p>
          <nav className={styles.navGroup}>
            <button 
              onClick={() => navigate('/admin/pages')}
              className={`${styles.navLink} ${isActive('/admin/pages') ? styles.active : ''}`}
            >
              <FileText size={18} />
              Pages
            </button>
          </nav>
        </div>

        {/* Updated Logout Button */}
        <button className={styles.logoutBtn} onClick={handleLogout}>
  <LogOut size={15} strokeWidth={2.5} />
  <span>Logout</span>
</button>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.scrollArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;