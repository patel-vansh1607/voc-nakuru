import React from 'react';
import { LayoutDashboard, FileText } from 'lucide-react';
import styles from '../components/AdminDashboard/AdminDashboard.module.css';

const Sidebar = ({ activePage }) => {
  return (
        <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>MINT</div>
      <nav className={styles.navGroup}>
        <a href="/admin" className={`${styles.navLink} ${activePage === 'dashboard' ? styles.active : ''}`}>
          <LayoutDashboard size={18} /> Dashboard
        </a>
        <a href="/admin/pages" className={`${styles.navLink} ${activePage === 'pages' ? styles.active : ''}`}>
          <FileText size={18} /> Pages
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;