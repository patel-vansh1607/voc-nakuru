import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Bhakti.module.css";
import { ChevronLeft, Calendar, MapPin, Loader2 } from "lucide-react";

const Bhakti = () => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState(null); // Prevents flicker
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('event_settings')
        .select('status')
        .eq('id', 'bhakti_bhavna')
        .single();
      
      if (data) {
        setEventStatus(data.status);
      }
      setLoading(false);
    };
    
    fetchStatus();

    const channel = supabase
      .channel('bhakti-sync')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'event_settings',
        filter: 'id=eq.bhakti_bhavna' 
      }, (payload) => {
        setEventStatus(payload.new.status);
      }).subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  // Professional loading screen while Supabase fetches
  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader2 className={styles.spinner} size={40} />
      </div>
    );
  }

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
            <h1 className={styles.title}>Bhakti Bhavna</h1>
            <div className={styles.details}>
              <span><Calendar size={14} /> 15 May 2026</span>
              <span><MapPin size={14} /> Nakuru Center</span>
            </div>
          </div>

          <div className={`${styles.screenWrapper} ${styles[eventStatus + 'Glow']}`}>
            <div className={styles.screenInner}>
              
              {/* WAITING */}
              {eventStatus === "waiting" && (
                <div className={styles.placeholderState}>
                  <div className={styles.timerIcon}>📿</div>
                  <h2>Preparing Stream</h2>
                  <p>The spiritual session will begin shortly. Please keep this page open.</p>
                </div>
              )}

              {/* LIVE */}
              {eventStatus === "live" && (
                <iframe 
                  src="https://www.youtube.com/embed/QVUhwfEq-KE?autoplay=1&rel=0&modestbranding=1" 
                  title="Live Stream"
                  className={styles.iframe}
                  allowFullScreen
                ></iframe>
              )}

              {/* COMPLETED - Direct replay, no button */}
              {eventStatus === "completed" && (
                <>
                  <div className={styles.completedOverlay}>
                    <span>Recording Available</span>
                  </div>
                  <iframe 
                    src="https://www.youtube.com/embed/QVUhwfEq-KE?rel=0&modestbranding=1" 
                    title="Event Recording"
                    className={styles.iframe}
                    allowFullScreen
                  ></iframe>
                </>
              )}
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bhakti;