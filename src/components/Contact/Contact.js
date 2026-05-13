import React from 'react';
import styles from './Contact.module.css';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mesh}></div>
      
      <header className={styles.header}>
        <h1 className={styles.title}>Get In Touch</h1>
      </header>

      <div className={styles.focusArea}>
        <div className={styles.profileCard}>
          <h3 className={styles.cardTitle}>Livestream & Technical Solutions</h3>
          <p className={styles.description}>
            Facing issues with the broadcast? 
          </p>

          <div className={styles.devInfo}>
            {/* <span className={styles.name}>Vansh Patel</span> */}
          </div>

          <div className={styles.btnGroup}>
            <a href="https://wa.me/254748660944" target="_blank" rel="noopener noreferrer" className={styles.whatsappBtn}>
              <Phone size={18} /> WhatsApp
            </a>
            <a href="mailto:pvansh830@gmail.com" className={styles.emailBtn}>
              <Mail size={18} /> Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;