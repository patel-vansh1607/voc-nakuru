import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import styles from './Home.module.css';
import { Loader2 } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [statuses, setStatuses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatuses = async () => {
      const { data } = await supabase.from('event_settings').select('id, status');
      if (data) {
        // We use the 'id' (stone_laying, bhakti_bhavna) as keys for better reliability
        const statusMap = data.reduce((acc, curr) => {
          acc[curr.id] = curr.status;
          return acc;
        }, {});
        setStatuses(statusMap);
      }
      setLoading(false);
    };
    fetchStatuses();

    const channel = supabase
      .channel('home-sync')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_settings' }, 
      (payload) => {
        setStatuses(prev => ({ ...prev, [payload.new.id]: payload.new.status }));
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const events = [
    { 
      id: "stone_laying", // Match this to your DB ID
      displayId: "Morning Event", 
      title: "Stone Laying Ceremony", 
      date: "15 . 05 . 2026", 
      path: "/stone-laying-ceremony" 
    },
    { 
      id: "bhakti_bhavna", // Match this to your DB ID
      displayId: "Evening Event", 
      title: "Bhakti Bhavna", 
      date: "15 . 05 . 2026", 
      path: "/bhakti-bhavna" 
    }
  ];

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader2 className={styles.spinner} size={40} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.subtitle}>Visa Oshwal Community Nakuru</h2>
        <h1 className={styles.mainTitle}>Events</h1>
        <p className={styles.subTitle}>15th May 2026</p>
      </header>

      <div className={styles.buttonGrid}>
        {events.map((event) => {
          const currentStatus = statuses[event.id] || "waiting";
          const isLive = currentStatus === "live";
          const isCompleted = currentStatus === "completed";
          
          return (
            <div 
              key={event.id} 
              onClick={() => navigate(event.path)} 
              className={`${styles.eventButton} ${styles[currentStatus]}`}
            >
              {/* STATUS BAR */}
              <div className={styles.statusSection}>
                <span className={styles.eventType}>{event.displayId}</span>
                <div className={`${styles.statusBadge} ${styles[currentStatus + 'Badge']}`}>
                  {isLive && <span className={styles.liveDot}></span>}
                  {isLive ? "LIVE NOW" : isCompleted ? "COMPLETED" : "UPCOMING"}
                </div>
              </div>

              {/* CONTENT AREA */}
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