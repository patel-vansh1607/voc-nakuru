import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Stone.module.css";

const Stone = () => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState("waiting");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from('event_settings').select('status').eq('id', 'stone_laying').single();
      if (data) setEventStatus(data.status);
    };
    fetchStatus();

    const channel = supabase
      .channel('stone-updates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_settings', filter: 'id=eq.stone_laying' }, 
      (payload) => {
        setEventStatus(payload.new.status);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <button onClick={() => navigate("/")} className={styles.backBtn}>← Back</button>
          <span className={styles.category}>Visa Oshwal Community</span>
        </div>
        <div className={styles.titleArea}>
          <h1 className={styles.title}>Stone Laying Ceremony</h1>
          <p className={styles.date}>Nakuru • 15 May 2026</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.videoContainer}>
          {eventStatus === "waiting" && (
            <div className={styles.waitingState}>
              <div className={styles.pulse}></div>
              <h2>Ceremony Starting Soon</h2>
              <p>Stay tuned, we are about to go live.</p>
            </div>
          )}

          {eventStatus === "live" && (
            <iframe 
              src="https://www.youtube.com/embed/-ZN6og5nMKI?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}

          {eventStatus === "completed" && (
            <div className={styles.completedState}>
              <h2>Ceremony Completed</h2>
              <p>Thank you for watching the Stone Laying Ceremony.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stone;