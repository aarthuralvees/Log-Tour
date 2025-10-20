import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';
import BotaoLista from './App/botao_lista'; 
import Chatbot from './App/chatbot';
import Roteiro from './App/Roteiro'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/botao_lista" element={<BotaoLista />} /> {/* Corrija o path */}
      <Route path="/roteiro" element={<Roteiro />} />
    </Routes>
  );
}

export default App;