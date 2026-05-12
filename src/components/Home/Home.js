import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    // 1. Fetch statuses for all events
    const fetchStatuses = async () => {
      const { data, error } = await supabase.from('event_settings').select('event_name, status');
      if (data) {
        // Create a mapping like { "Bhakti Bhavna": "live", "Stone Laying": "waiting" }
        const statusMap = data.reduce((acc, curr) => {
          acc[curr.event_name] = curr.status;
          return acc;
        }, {});
        setStatuses(statusMap);
      }
    };

    fetchStatuses();

    // 2. Real-time update
    const channel = supabase
      .channel('home-status-sync')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_settings' }, 
      (payload) => {
        setStatuses(prev => ({
          ...prev,
          [payload.new.event_name]: payload.new.status
        }));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const events = [
    {
      id: "event-1",
      title: "Stone Laying Ceremony",
      date: "15 . 05 . 2026",
      path: "/stone-laying-ceremony"
    },
    {
      id: "event-2",
      title: "Bhakti Bhavna",
      date: "15 . 05 . 2026",
      path: "/bhakti-bhavna"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.subtitle}>Visa Oshwal Community Nakuru</h2>
        <h1 className={styles.mainTitle}>Upcoming Events</h1>
      </header>

      <div className={styles.buttonGrid}>
        {events.map((event) => {
          const currentStatus = statuses[event.title] || "waiting";
          
          return (
            <div 
              key={event.id} 
              onClick={() => navigate(event.path)} 
              className={`${styles.eventButton} ${styles[currentStatus]}`}
            >
              <div className={styles.topRow}>
                <span className={styles.eventType}>{event.id.toUpperCase()}</span>
                {/* Dynamic Status Badge */}
                <span className={`${styles.statusBadge} ${styles[currentStatus + 'Badge']}`}>
                  {currentStatus === "live" ? "● LIVE" : currentStatus.toUpperCase()}
                </span>
              </div>

              <h3 className={styles.eventTitle}>{event.title}</h3>
              
              <div className={styles.footer}>
                <span className={styles.eventDate}>{event.date}</span>
                <span className={styles.actionText}>Enter Route →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;