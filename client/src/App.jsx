import React from 'react';

//importa a imagem do turi
import robotIcon from './assets/turi1.png';

// biblioteca caso precise de algum icone
import { AiOutlinePlus } from 'react-icons/ai';

// cabecalho com ícone turi e texto
const Header = () => (
  <header className="flex items-center space-x-4 p-4 border-2 border-blue-400 rounded-xl">
    
    {}
    <img 
      src={robotIcon} 
      alt="Turi, o assistente robô" 
      className="w-15 h-14" // ajusta o tamanho da imagem do turi
    />
    
    <h1 className="text-4xl font-extrabold text-blue-500">
      Turi, seu Assistente IA para Viagens
    </h1>
  </header>
);

// janela da conversa
const ChatWindow = () => (
  <main className="border-2 border-blue-400 rounded-xl p-6 flex-grow">
    {/* integrar com o json */}
  </main>
);

//  barra de resposta
const InputBar = () => (
  <div className="flex items-center space-x-4 p-3 border-2 border-blue-400 rounded-xl">
    <AiOutlinePlus className="text-blue-500 text-2xl font-bold" />
    <input
      type="text"
      placeholder="Como posso ajudar você hoje?"
      className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-500"
    />
  </div>
);

// marca-dagua
const Footer = () => (
  <footer className="text-center text-gray-500 text-sm py-4">
    <p>© LogTour 2025</p>
  </footer>
);

// aqui é o app
function App() {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans flex flex-col">
      <div className="max-w-screen-2xl mx-auto bg-white p-6 rounded-2xl border-2 border-blue-400 space-y-6 flex flex-col flex-grow w-full">
        
        <Header />
        <ChatWindow />
        <InputBar />
        
      </div>
      <Footer />
    </div>
  );
}

export default App;