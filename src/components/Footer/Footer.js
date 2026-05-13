import React from 'react';
import styles from './Footer.module.css';
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        
        <div className={styles.signatureBox}>
          <span className={styles.label}>website Developed & designed by</span>
          <span className={styles.nameLink}>Vansh Patel</span>
        </div>

        <div className={styles.actionGroup}>
          <a 
            href="https://wa.me/254748660944" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.actionBtn}
          >
            <MessageCircle size={16} />
            <span>WhatsApp</span>
          </a>

          <a 
            href="mailto:pvansh830@gmail.com" 
            className={`${styles.actionBtn} ${styles.emailBtn}`}
          >
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;