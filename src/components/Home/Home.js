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

  const goldenEvent = { 
    id: "golden", 
    displayId: "Evening Event", 
    title: "The Golden Jubilee", 
    date: "23 . 05 . 2026", 
    path: "/the-golden-jubilee" 
  };

  const may15Events = [
    { 
      id: "stone_laying", 
      displayId: "Morning Event", 
      title: "Stone Laying Ceremony", 
      date: "15 . 05 . 2026", 
      path: "/stone-laying-ceremony" 
    },
    { 
      id: "bhakti_bhavna", 
      displayId: "Evening Event", 
      title: "Bhakti Bhavna", 
      date: "15 . 05 . 2026", 
      path: "/bhakti-bhavna" 
    }
  ];

  const renderEventCard = (event) => {
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
  };

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
      </header>

      <div className={styles.timelineContainer}>
        {/* 23rd MAY SECTION */}
        <div className={styles.dateGroup}>
          <p className={styles.sectionDate}>23rd May 2026</p>
          <div className={styles.buttonGrid}>
            {renderEventCard(goldenEvent)}
          </div>
        </div>

        {/* 15th MAY SECTION */}
        <div className={styles.dateGroup}>
          <p className={styles.sectionDate}>15th May 2026</p>
          <div className={styles.buttonGrid}>
            {may15Events.map((event) => renderEventCard(event))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;