// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const uploadPDF = (data) => API.post('/upload', data);
export const sendPDFData = (data) => API.post('/send', data);
