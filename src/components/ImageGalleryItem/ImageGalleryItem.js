import React, { Component } from 'react';
import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  render() {
    const { image, onClick } = this.props;

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
}

export default ImageGalleryItem;





