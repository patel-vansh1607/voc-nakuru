import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Bhakti.module.css";

const Bhakti = () => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState("waiting"); // waiting, live, completed

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase.from('event_settings').select('*').single();
      if (data) setEventStatus(data.status);
    };
    fetchStatus();

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event_settings' }, 
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
          <h1 className={styles.title}>Bhakti Bhavna</h1>
          <p className={styles.date}>Nakuru • 15 May 2026</p>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.videoContainer}>
          {/* Status Key / Indicator Overlay */}
          <div className={`${styles.statusKey} ${styles[eventStatus]}`}>
             <span className={styles.dot}></span>
             {eventStatus === "waiting" && "UPCOMING"}
             {eventStatus === "live" && "LIVE NOW"}
             {eventStatus === "completed" && "COMPLETED"}
          </div>

          {eventStatus === "waiting" && (
            <div className={styles.waitingState}>
              <div className={styles.pulse}></div>
              <h2>Stream Starting Soon</h2>
              <p>The Bhakti Bhavna will commence shortly. Stay tuned.</p>
            </div>
          )}

          {eventStatus === "live" && (
            <iframe 
              src="https://www.youtube.com/embed/QVUhwfEq-KE?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}

          {eventStatus === "completed" && (
            <div className={styles.completedState}>
              <h2>Event Completed</h2>
              <p>Thank you for joining the Nakuru Community broadcast.</p>
              <button onClick={() => setEventStatus("live")} className={styles.replayBtn}>Watch Replay</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Bhakti;