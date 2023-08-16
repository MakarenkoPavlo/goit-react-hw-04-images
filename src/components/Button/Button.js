import React, { Component } from 'react';
import styles from './Button.module.css';

class Button extends Component {
  render() {
    const { onClick, children } = this.props;

    return (
      <button className={styles.Button} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default Button;