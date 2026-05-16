import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Bhakti.module.css";
import styless   from "../Stone/Stone.module.css"; // Reusing some styles for loading state
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
      
      <header className={styless.navBar}>
        <button onClick={() => navigate("/")} className={styless.backButton}>
          <ChevronLeft size={20} />
          <span>Events</span>
        </button>
        <div className={styless.brand}>Visa Oshwal Community</div>
      </header>

      <main className={styles.container}>
        <div className={styles.heroSection}>
          <div className={styles.meta}>
            <div className={`${styless.badge} ${styless[eventStatus + 'Badge']}`}>
              <span className={styless.pulseDot}></span>
              {eventStatus === "waiting" ? "UPCOMING" : eventStatus.toUpperCase()}
            </div>
            <h1 className={styles.title}>Bhakti Bhavna</h1>
            <div className={styles.details}>
              <span><Calendar size={14} /> 15 May 2026</span>
              <span><MapPin size={14} /> Nakuru Center</span>
            </div>
          </div>

          <div className={`${styless.screenWrapper} ${styless[eventStatus + 'Glow']}`}>
            <div className={styless.screenInner}>
              
              {/* WAITING */}
              {eventStatus === "waiting" && (
                <div className={styless.placeholderState}>
<div className={styless.timerIcon}>
  <div className={styless.innerZap}>⚡</div>
  <div className={styless.pulseRing}></div>
  <div className={styless.pulseRing2}></div>
</div>            
                  <h2 className={styless.pa}>Live Stream will Start at <br /> 7:45pm EAT, 15th May</h2>
                  <p>We are preparing the broadcast.</p>
                </div>
              )}

              {/* LIVE */}
              {eventStatus === "live" && (
                <iframe 
                  src="https://www.youtube.com/embed/QVUhwfEq-KE?autoplay=1&rel=0&modestbranding=1" 
                  title="Live Stream"
                  className={styless.iframe}
                  allowFullScreen
                ></iframe>
              )}

              {/* COMPLETED - Direct replay, no button */}
              {eventStatus === "completed" && (
                <>
                  <div className={styles.completedOverlay}>
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