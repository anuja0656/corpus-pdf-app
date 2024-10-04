// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Upload from './components/Upload/Upload';
import PDFList from './components/PDFList/PDFList';
import Result from './components/Result/Result';
import './App.module.css';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pdf-list" element={<PDFList />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  </Router>
);

export default App;
