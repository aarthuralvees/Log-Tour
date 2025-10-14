import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';
import Login from './App/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
