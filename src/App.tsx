import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import PhotoUpload from './pages/PhotoUpload';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload-photos" element={<PhotoUpload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;