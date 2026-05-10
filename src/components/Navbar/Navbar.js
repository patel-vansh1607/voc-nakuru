import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    // Set the current path on mount to handle active styling
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => setIsActive(false);

  // Helper to check if a link is active
  const getLinkClass = (path) => {
    return currentPath === path ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <a href="/" className={styles.logo} onClick={closeMenu}>
          VISA OSHWAL COMMUNITY NAKURU
        </a>

        <div 
          className={`${styles.menuToggle} ${isActive ? styles.toggleActive : ''}`} 
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <ul className={`${styles.navLinks} ${isActive ? styles.active : ''}`}>
          <li>
            <a href="/" className={getLinkClass('/')} onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/services" className={getLinkClass('/services')} onClick={closeMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className={getLinkClass('/contact')} onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="/upload" className={styles.uploadBtn} onClick={closeMenu}>
              Upload
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;