import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';
import Roteiro from './App/Roteiro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roteiro" element={<Roteiro />} />
    </Routes>
  );
}

export default App;
