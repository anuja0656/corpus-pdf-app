// src/components/Home/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => (
  <div className={styles.container}>
    <h1>Welcome to CorpusAI</h1>
    <div className={styles.buttons}>
      <Link to="/login" className={styles.button}>Login</Link>
      <Link to="/register" className={styles.button}>Register</Link>
    </div>
  </div>
);

export default Home;
