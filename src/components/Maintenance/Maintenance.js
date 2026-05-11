import React from 'react';
import styles from './Maintenance.module.css';

const Maintenance = () => {
  return (
    <div className={styles.wrapper}>
      {/* Decorative Corners */}
      <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778501472/stone_laying_cermony-07_glpkxp.png" alt="" className={`${styles.deco} ${styles.topL}`} />
      <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778501472/stone_laying_cermony-07_glpkxp.png" alt="" className={`${styles.deco} ${styles.topR}`} />
      <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778501472/stone_laying_cermony-07_glpkxp.png" alt="" className={`${styles.deco} ${styles.btmL}`} />
      <img src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778501472/stone_laying_cermony-07_glpkxp.png" alt="" className={`${styles.deco} ${styles.btmR}`} />

      <div className={styles.bgImage}></div>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <img 
            src="https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778500292/stone_laying_cermony-06_krb9qx.png" 
            alt="Logo" 
            className={styles.logo}
          />
        </header>

        <main className={styles.mainContent}>
          <h1 className={styles.headline}>We Are Almost <br/> Ready to Launch!</h1>
          <p className={styles.date}>14 . 05 . 2026</p>
        </main>
      </div>
    </div>
  );
};

export default Maintenance;