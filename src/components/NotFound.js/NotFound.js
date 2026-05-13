import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.meshGradient}></div>
      
      <div className={styles.content}>
        <div className={styles.visual}>
          <h1 className={styles.errorCode}>404</h1>
        </div>

        <div className={styles.textSection}>
          <h2 className={styles.title}>The page you are looking for doesn't exist.</h2>
        </div>

        <button onClick={() => navigate('/')} className={styles.actionBtn}>
          <Home size={18} />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};

export default NotFound;