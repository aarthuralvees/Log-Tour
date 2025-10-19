import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './App/Home';
import TestPage from './App/TestPage';
import BotaoLista from './App/botao_lista'; // Corrija o nome do componente e o caminho
import Chatbot from './App/chatbot';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/botao_lista" element={<BotaoLista />} /> {/* Corrija o path */}
    </Routes>
  );
}

export default App;
