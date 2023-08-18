import React from 'react';
import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ image, onClick }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={image.webformatURL}
        alt=""
        className={styles.ImageGalleryItemImage}
        onClick={() => onClick(image.largeImageURL)}
      />
    </li>
  );
}

export default ImageGalleryItem;
