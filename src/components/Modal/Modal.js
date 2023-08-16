import React, { Component } from 'react';
import styles from './Modal.module.css';

class Modal extends Component {
  render() {
    const { isOpen, onClose, imageUrl } = this.props;
    
    if (!isOpen) return null;

    return (
      <div className={styles.Overlay} onClick={onClose}>
        <div className={styles.Modal}>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;





