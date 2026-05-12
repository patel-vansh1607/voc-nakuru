import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Stone.module.css";
import { ChevronLeft, Calendar, MapPin } from "lucide-react";

const Stone = () => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState("waiting");

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('event_settings')
        .select('status')
        .eq('id', 'stone_laying')
        .single();
      if (data) setEventStatus(data.status);
    };
    fetchStatus();

    const channel = supabase
      .channel('stone-updates')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'event_settings', 
        filter: 'id=eq.stone_laying' 
      }, 
      (payload) => {
        setEventStatus(payload.new.status);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles[eventStatus + 'Bg']}`}>
      <header className={styles.header}>
        <div className={styles.topRow}>
          <button onClick={() => navigate("/")} className={styles.backBtn}>
            <ChevronLeft size={16} /> BACK
          </button>
          <span className={styles.category}>Visa Oshwal Community</span>
        </div>
        
        <div className={styles.titleArea}>
          <div className={`${styles.statusBadge} ${styles[eventStatus + 'Badge']}`}>
            <span className={styles.dot}></span>
            {eventStatus === "waiting" ? "UPCOMING" : eventStatus.toUpperCase()}
          </div>
          <h1 className={styles.title}>Stone Laying Ceremony</h1>
          <div className={styles.meta}>
             <span><Calendar size={16} /> 15 May 2026</span>
             <span><MapPin size={16} /> Nakuru</span>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={`${styles.videoContainer} ${styles[eventStatus + 'Glow']}`}>
          {eventStatus === "waiting" && (
            <div className={styles.placeholderState}>
              <div className={styles.pulse}></div>
              <h2>Ceremony Starting Soon</h2>
              <p>We are preparing the broadcast. Please stay tuned.</p>
            </div>
          )}

          {eventStatus === "live" && (
            <iframe 
              src="https://www.youtube.com/embed/-ZN6og5nMKI?autoplay=1&rel=0" 
              title="Stone Laying Live" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}

          {eventStatus === "completed" && (
            <div className={styles.placeholderState}>
              <div className={styles.checkIcon}>✓</div>
              <h2>Ceremony Completed</h2>
              <p>Thank you for watching the Stone Laying Ceremony.</p>
              <button onClick={() => setEventStatus("live")} className={styles.replayBtn}>Watch Replay</button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Stone;