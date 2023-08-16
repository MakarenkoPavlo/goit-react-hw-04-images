import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './Loader.module.css';

class Loader extends Component {
  render() {
    return (
      <div className={styles.Loader}>
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}

export default Loader;



