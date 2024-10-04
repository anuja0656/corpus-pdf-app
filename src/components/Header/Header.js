// src/components/Header/Header.js
import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className={styles.header}>
    <Link to="/" className={styles.logo}>CorpusAI</Link>
  </header>
);

export default Header;
