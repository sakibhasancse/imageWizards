import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EyeFundusSegmentation from './pages/EyeFundusSegmentation';
import MelanomaSegmentation from './pages/MelanomaSegmentation';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eye-fundus" element={<EyeFundusSegmentation />} />
        <Route path="/melanoma" element={<MelanomaSegmentation />} />
      </Routes>
    </Router>
  );
}

export default App;
