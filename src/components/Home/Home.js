import React from 'react';
import styles from './Home.module.css';

const Home = () => {

  const events = [
    {
      id: "event-1",
      title: "Stone Laying Ceremony",
      date: "15 . 05 . 2026",
      path: "/stone-laying-ceremony"
    },
    {
      id: "event-2",
      title: "January Ceremonies",
      date: "23 . 01 . 2026",
      path: "/replays"
    }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.subtitle}>Visa Oshwal Community Nakuru</h2>
        <h1 className={styles.mainTitle}>Portal Events</h1>
      </header>

      <div className={styles.buttonGrid}>
        {events.map((event) => (
          /* Changed from <button> to <a> and using href */
          <a 
            key={event.id} 
            href={event.path} 
            className={styles.eventButton}
          >
            <span className={styles.eventType}>{event.id.toUpperCase()}</span>
            <h3 className={styles.eventTitle}>{event.title}</h3>
            <div className={styles.footer}>
              <span className={styles.eventDate}>{event.date}</span>
              <span className={styles.actionText}>Enter Route →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;