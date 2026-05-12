import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const fetchStatuses = async () => {
      const { data } = await supabase.from('event_settings').select('title, status');
      if (data) {
        const statusMap = data.reduce((acc, curr) => {
          acc[curr.title] = curr.status;
          return acc;
        }, {});
        setStatuses(statusMap);
      }
    };
    fetchStatuses();

    const channel = supabase
      .channel('home-sync')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_settings' }, 
      (payload) => {
        setStatuses(prev => ({ ...prev, [payload.new.title]: payload.new.status }));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const events = [
    { id: "event-1", title: "Stone Laying Ceremony", date: "15 . 05 . 2026", path: "/stone-laying-ceremony" },
    { id: "event-2", title: "Bhakti Bhavna", date: "15 . 05 . 2026", path: "/bhakti-bhavna" }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.subtitle}>Visa Oshwal Community Nakuru</h2>
        <h1 className={styles.mainTitle}>Events</h1>
      </header>

      <div className={styles.buttonGrid}>
        {events.map((event) => {
          const currentStatus = statuses[event.title] || "waiting";
          const isLive = currentStatus === "live";
          const isCompleted = currentStatus === "completed";
          
          return (
            <div 
              key={event.id} 
              onClick={() => navigate(event.path)} 
              className={`${styles.eventButton} ${styles[currentStatus]}`}
            >
              {/* WHITE STATUS BAR */}
              <div className={styles.statusSection}>
                <span className={styles.eventType}>{event.id.toUpperCase()}</span>
                <div className={`${styles.statusBadge} ${styles[currentStatus + 'Badge']}`}>
                  {isLive && <span className={styles.liveDot}></span>}
                  {isLive ? "LIVE NOW" : isCompleted ? "COMPLETED" : "UPCOMING"}
                </div>
              </div>

              {/* PURPLE CONTENT AREA */}
              <div className={styles.contentSection}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                
                <div className={styles.footer}>
                  <span className={styles.eventDate}>{event.date}</span>
                  <div className={styles.actionButton}>
                    {isLive ? "WATCH LIVE" : isCompleted ? "WATCH REPLAY" : "ENTER"} →
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;