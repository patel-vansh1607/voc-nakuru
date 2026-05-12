import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styles from './AdminDashboard.module.css';
import { LayoutDashboard, FileText, Settings, Layers, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logic to highlight the active button based on the current URL
  const isActive = (path) => location.pathname === path;

  return (
    <div className={styles.layout}>
      {/* Sidebar Navigation - Permanent Shell */}
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
            <button className={styles.navLink}><Layers size={18} /> Components</button>
            <button className={styles.navLink}><Settings size={18} /> Settings</button>
          </nav>
        </div>

        <button className={styles.logoutBtn} onClick={() => navigate('/admin/login')}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <div className={styles.scrollArea}>
          {/* THE OUTLET: This is where AdminStudio or other pages render */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;