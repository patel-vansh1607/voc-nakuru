import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventController from './EventController';
import styles from './EventController.module.css';

const EventControlPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Reusing the Floating Sidebar */}
      <aside className={styles.floatingSidebar}>
        <div className={styles.brand}>VOC</div>
        <nav className={styles.nav}>
          <button onClick={() => navigate('/admin/dashboard')} className={styles.navItem}>Dashboard</button>
          <button className={styles.navItemActive}>Live Control</button>
          <button className={styles.navItem}>Members</button>
        </nav>
      </aside>

      <main className={styles.main}>
        <header className={styles.header}>
          <div>
            <h1>Live Studio</h1>
            <p className={styles.userEmail}>Broadcasting Control Center</p>
          </div>
          <div className={styles.liveStatusBadge}>Ready to Stream</div>
        </header>

        <section className={styles.controlCenter}>
           {/* Your EventController component sits here */}
           <EventController />
           
           <div className={styles.tipsCard}>
             <h4>Broadcast Protocol</h4>
             <ul>
               <li><strong>Upcoming:</strong> Shows the pulse and countdown to users.</li>
               <li><strong>Live:</strong> Switches all user frames to the YouTube player.</li>
               <li><strong>Archive:</strong> Closes the stream and saves the replay view.</li>
             </ul>
           </div>
        </section>
      </main>
    </div>
  );
};

export default EventControlPage;