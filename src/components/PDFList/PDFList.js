// src/components/PDFList/PDFList.js
import React, { useState, useEffect } from 'react';
import styles from './PDFList.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PDFList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdfs, setSelectedPdfs] = useState([]);
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of uploaded PDFs from the backend
    const fetchPDFs = async () => {
      try {
        const response = await axios.get('/api/pdf-list');
        setPdfs(response.data.pdfs); // assuming backend returns an array of PDFs
      } catch (err) {
        setError('Failed to fetch PDFs');
      }
    };

    fetchPDFs();
  }, []);

  const handleCheckboxChange = (pdf) => {
    if (selectedPdfs.includes(pdf)) {
      setSelectedPdfs(selectedPdfs.filter(item => item !== pdf));
    } else {
      setSelectedPdfs([...selectedPdfs, pdf]);
    }
  };

  const handleSend = async () => {
    if (selectedPdfs.length === 0) {
      setError('Please select at least one PDF');
      return;
    }

    if (question.trim() === '') {
      setError('Please enter a question');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        selectedPdfs,
        question,
      };
      const response = await axios.post('/api/send', payload);
      
      // Navigate to Result page with the response data
      navigate('/result', { state: { question, answer: response.data.answer } });
    } catch (err) {
      setError('Failed to send data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Select PDFs and Submit a Question</h2>
      <ul className={styles.pdfList}>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                checked={selectedPdfs.includes(pdf)}
                onChange={() => handleCheckboxChange(pdf)}
              />
              {pdf}
            </label>
          </li>
        ))}
      </ul>
      {error && <div className={styles.error}>{error}</div>}
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your question"
      />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default PDFList;
