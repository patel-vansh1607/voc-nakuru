import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import styles from "./Golden.module.css";
import styless   from "../Stone/Stone.module.css"; // Reusing some styles for loading state
import { ChevronLeft, Calendar, MapPin, Loader2 } from "lucide-react";

const Golden = () => {
  const navigate = useNavigate();
  const [eventStatus, setEventStatus] = useState(null); // Prevents flicker
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      const { data } = await supabase
        .from('event_settings')
        .select('status')
        .eq('id', 'golden')
        .single();
      
      if (data) {
        setEventStatus(data.status);
      }
      setLoading(false);
    };
    
    fetchStatus();

    const channel = supabase
      .channel('golden-sync')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'event_settings',
        filter: 'id=eq.golden' 
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
            <h1 className={styles.title}>The Golden Jubilee</h1>
            <div className={styles.details}>
              <span><Calendar size={14} /> 23 May 2026</span>
              <span><MapPin size={14} /> Nakuru</span>
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
                  <h2 className={styless.pa}>Live Stream will Start at <br /> 6:45pm EAT, 23rd May</h2>
                  <p>We are preparing the broadcast.</p>
                </div>
              )}

              {/* LIVE */}
              {eventStatus === "live" && (
                <iframe 
src="https://www.youtube.com/embed/eYg4DqmFBvU?si=Co7AN2g5y65O-U1i"                  title="Live Stream"
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
                    src="https://www.youtube.com/embed/eYg4DqmFBvU?si=4mnojz8e0wWk2XBS" 
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

export default Golden;