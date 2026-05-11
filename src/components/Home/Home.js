import React, { useState } from 'react';
import styles from './Home.module.css';

const Home = () => {
  const streams = [
    { day: "Day 1", date: "Friday, 23 January 2026", id: "VIDEO_ID_1" },
    { day: "Day 2", date: "Saturday, 24 January 2026", id: "VIDEO_ID_2" },
    { day: "Day 3", date: "Sunday, 25 January 2026", id: "VIDEO_ID_3" },
  ];

  const [selectedStream, setSelectedStream] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.headerArea}>
        <h2 className={styles.title}>Select a day to view</h2>
        <div className={styles.underline}></div>
      </div>
      
      <div className={styles.cardList}>
        {streams.map((item, index) => (
          <div 
            key={index} 
            className={styles.cardWrapper}
            onClick={() => setSelectedStream(item.id)}
          >
            <div className={styles.badge}>
              ✓ COMPLETED- CLICK TO WATCH REPLAY
            </div>
            
            <div className={styles.cardBody}>
              <span className={styles.dayLabel}>{item.day}</span>
              <span className={styles.divider}>|</span>
              <span className={styles.dateLabel}>{item.date}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedStream && (
        <div className={styles.videoOverlay}>
          <div className={styles.videoContainer}>
            <button onClick={() => setSelectedStream(null)} className={styles.closeBtn}>✕ Close</button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedStream}?autoplay=1`}
              title="Event Replay"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;