import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Stone.module.css";

const Stone = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
<header className={styles.header}>
  <div className={styles.topRow}>
    <button onClick={() => navigate("/")} className={styles.backBtn}>
      ← Back
    </button>
    <span className={styles.category}>Visa Oshwal Community</span>
  </div>
  
  <div className={styles.titleArea}>
    <h1 className={styles.title}>Stone Laying Ceremony</h1>
    <p className={styles.date}>Nakuru • 15 May 2026</p>
  </div>
</header>
      <main className={styles.mainContent}>
        <div className={styles.videoContainer}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/-ZN6og5nMKI?si=qwKMZORXEr2No00j"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>

        <div className={styles.details}>
          <h3>Event Overview</h3>
          <p>
            Welcome to the official portal. The live broadcast will appear here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Stone;
