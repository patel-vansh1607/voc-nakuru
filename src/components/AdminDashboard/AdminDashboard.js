import React from 'react';
import styles from './AdminDashboard.module.css';
import { LayoutDashboard, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>MINT</div>
        
        <nav className={styles.navGroup}>
          <a href="/admin/pages" className={styles.navLink}>
            <LayoutDashboard size={18} />
            Pages
          </a>
          {/* Add more links here later */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <p className={styles.subtitle}>Executive Suite</p>
          <h1 className={styles.mainTitle}>Dashboard</h1>
        </header>

        <div className={styles.dashboardGrid}>
          <div className={styles.eventButton} onClick={() => window.location.href='/reports'}>
            <div>
              <span className={styles.eventType}>System Stat</span>
              <h3 className={styles.eventTitle}>Platform Performance</h3>
            </div>
            <div className={styles.footer}>
              <span className={styles.eventDate}>Active Now</span>
              <span className={styles.actionText}>
                Open Report <ArrowRight size={14} style={{ marginLeft: '5px' }} />
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;