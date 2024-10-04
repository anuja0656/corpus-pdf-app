// src/components/Result/Result.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Result.module.css';

const Result = () => {
  const location = useLocation();
  const { question, answer } = location.state || {};

  return (
    <div className={styles.container}>
      <h2>Result</h2>
      {question && (
        <>
          <div className={styles.questionBox}>
            <strong>Question:</strong> {question}
          </div>
          <div className={styles.answerBox}>
            <strong>Answer:</strong> {answer}
          </div>
        </>
      )}
      {!question && <p>No data to display</p>}
    </div>
  );
};

export default Result;
