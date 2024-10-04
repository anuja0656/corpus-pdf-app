// src/components/Upload/Upload.js
import React, { useState } from 'react';
import styles from './Upload.module.css';
import axios from 'axios';

const Upload = () => {
  const [files, setFiles] = useState([]);  // State to hold selected files
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection and validate if all files are PDFs
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const isValid = selectedFiles.every(file => file.type === 'application/pdf');

    if (!isValid) {
      setError('Only PDF files are allowed');
      return;
    }

    setFiles(selectedFiles);  // Store selected files
    setError('');
  };

  // Handle the 'Proceed' button click to send file names to the backend
  const handleUpload = async () => {
    if (!files.length) {
      setError('Please select a file');
      return;
    }

    // Extract file names from the selected files
    const fileNames = files.map(file => file.name);

    // Log the file names in JSON format
    const jsonPayload = JSON.stringify({ pdfs: fileNames });
    console.log("Selected PDFs (in JSON format):", jsonPayload);

    setLoading(true);

    try {
      // Send only the file names to the backend
      const response = await axios.post('/api/upload-pdf-names', { pdfs: fileNames });

      if (response.status === 200) {
        console.log('PDF names sent to the backend successfully');
        setError('');  // Clear error if successful
      }
    } catch (err) {
      setError('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Upload PDFs</h2>

      {/* Input to select multiple files */}
      <input type="file" multiple onChange={handleFileChange} />

      {/* Show error if any */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Button to trigger file names upload */}
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Uploading...' : 'Proceed'}
      </button>
    </div>
  );
};

export default Upload;
