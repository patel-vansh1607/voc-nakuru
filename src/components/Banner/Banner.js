import React from 'react';
import styles from './Banner.module.css';

const Banner = () => {
  const desktopImage = "https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778488741/voc_nakuru_landscape_i52gde.png";
  const mobileImage = "https://res.cloudinary.com/dxgkcyfrl/image/upload/v1778488740/voc_nakuru_potrait_obsxkh.png";
  const redirectLink = "/services";

  return (
    <div className={styles.bannerWrapper}>
      <a href={redirectLink} className={styles.bannerLink}>
        <picture>
          {/* Swaps to mobile/portrait if width is less than 1920px */}
          <source media="(max-width: 1919px)" srcSet={mobileImage} />
          
          <img 
            src={desktopImage} 
            alt="Visa Oshwal Nakuru Banner" 
            className={styles.bannerImage}
          />
        </picture>
        <div className={styles.overlay} />
      </a>
    </div>
  );
};

export default Banner;