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
      // Updated to point to stone_laying ID
      const { data } = await supabase
        .from('event_settings')
        .select('status')
        .eq('id', 'stone_laying')
        .single();
      if (data) setEventStatus(data.status);
    };
    fetchStatus();

    const channel = supabase
      .channel('stone-sync')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'event_settings',
        filter: 'id=eq.stone_laying' 
      }, (payload) => {
        setEventStatus(payload.new.status);
      }).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles[eventStatus + 'Bg']}`}>
      <div className={styles.overlay}></div>
      
      <header className={styles.navBar}>
        <button onClick={() => navigate("/")} className={styles.backButton}>
          <ChevronLeft size={20} />
          <span>Events</span>
        </button>
        <div className={styles.brand}>Visa Oshwal Community</div>
      </header>

      <main className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.meta}>
            <div className={`${styles.badge} ${styles[eventStatus + 'Badge']}`}>
              <span className={styles.pulseDot}></span>
              {eventStatus === "waiting" ? "UPCOMING" : eventStatus.toUpperCase()}
            </div>
            {/* Title Updated */}
            <h1 className={styles.title}>Stone Laying Ceremony</h1>
            <div className={styles.details}>
              <span><Calendar size={14} /> 15 May 2026</span>
              <span><MapPin size={14} /> Nakuru Center</span>
            </div>
          </div>

          <div className={`${styles.screenWrapper} ${styles[eventStatus + 'Glow']}`}>
            <div className={styles.screenInner}>
              {eventStatus === "waiting" && (
                <div className={styles.placeholderState}>
                  <div className={styles.timerIcon}>🏗️</div>
                  <h2>Ceremony Starting Soon</h2>
                  <p>We are preparing the broadcast. Please keep this page open.</p>
                </div>
              )}

              {eventStatus === "live" && (
                <iframe 
                  src="https://www.youtube.com/embed/-ZN6og5nMKI?autoplay=1&rel=0&modestbranding=1" 
                  title="Live Stream"
                  className={styles.iframe}
                  allowFullScreen
                ></iframe>
              )}

              {eventStatus === "completed" && (
                <div className={styles.placeholderState}>
                  <div className={styles.checkIcon}>✓</div>
                  <h2>Ceremony Concluded</h2>
                  <p>Thank you for attending virtually. Replay is available below.</p>
                  <button onClick={() => setEventStatus("live")} className={styles.replayBtn}>
                    Watch Replay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stone;