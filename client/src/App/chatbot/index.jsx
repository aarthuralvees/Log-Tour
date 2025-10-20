import React, { useState, useRef, useEffect } from 'react';
import robotIcon from '../assets/turi1.png';
import { AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { useChat } from '../../hooks/useChat';

// Componente para exibir uma mensagem
const Message = ({ message }) => (
  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.type === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-800'
      }`}
    >
      <p className="text-sm">{message.text}</p>
      <span className="text-xs opacity-70">
        {message.timestamp.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </div>
  </div>
);

// Cabeçalho com ícone turi e texto
const Header = () => (
  <header className="flex items-center space-x-4 p-4 border-2 border-blue-400 rounded-xl">
    <img 
      src={robotIcon} 
      alt="Turi, o assistente robô" 
      className="w-16 h-14"
    />
    <h1 className="text-4xl font-extrabold text-blue-500">
      Turi, seu Assistente IA para Viagens
    </h1>
  </header>
);

// Janela da conversa
const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="border-2 border-blue-400 rounded-xl p-6 flex-grow overflow-y-auto max-h-96">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </main>
  );
};

// Barra de resposta com estado
const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-center space-x-4 p-3 border-2 border-blue-400 rounded-xl">
      {message.trim() ? (
        <button 
          onClick={handleSend}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          <AiOutlineSend className="text-2xl font-bold" />
        </button>
      ) : (
        <AiOutlinePlus className="text-blue-500 text-2xl font-bold" />
      )}
      
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Digite sua resposta..."
        className="w-full bg-transparent focus:outline-none text-gray-600 placeholder-gray-500"
      />
    </div>
  );
};

// Componente para mostrar dados coletados
const DadosColetados = ({ dados }) => (
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
    <h3 className="font-bold text-gray-700 mb-2">Dados da Viagem:</h3>
    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
      {JSON.stringify(dados, null, 2)}
    </pre>
  </div>
);

// Marca d'água
const Footer = () => (
  <footer className="text-center text-gray-500 text-sm py-4">
    <p>© LogTour 2025</p>
  </footer>
);

// Componente principal
function Chatbot() {
  const { messages, dadosViagem, processarResposta } = useChat();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans flex flex-col">
      <div className="max-w-screen-2xl mx-auto bg-white p-6 rounded-2xl border-2 border-blue-400 space-y-6 flex flex-col flex-grow w-full">
        <Header />
        <ChatWindow messages={messages} />
        <InputBar onSendMessage={processarResposta} />
        
        {/* Mostra dados coletados (remover em produção) */}
        <DadosColetados dados={dadosViagem} />
      </div>
      <Footer />
    </div>
  );
}

export default Chatbot;
