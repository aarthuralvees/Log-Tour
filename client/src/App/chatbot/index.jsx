import React, { useState, useRef, useEffect } from 'react';
import robotIcon from '../../assets/turi1.png';
import { AiOutlinePlus, AiOutlineSend } from 'react-icons/ai';
import { useChat } from '../../hooks/useChat';
import ChatBubble from '../../components/text_box/ChatBubble';

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

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="border-2 border-blue-400 rounded-xl p-6 flex-grow overflow-y-auto">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.text}
          isUser={message.type === 'user'}
        />
      ))}
      <div ref={messagesEndRef} />
    </main>
  );
};

const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => setMessage(e.target.value);
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };
  const handleKeyPress = (e) => e.key === 'Enter' && handleSend();

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

const Footer = () => (
  <footer className="text-center text-gray-500 text-sm py-4">
    <p>© LogTour 2025</p>
  </footer>
);

// Main Chatbot
function Chatbot() {
  const { messages, dadosViagem, processarResposta } = useChat();

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 font-sans flex flex-col">
      <div className="max-w-screen-2xl mx-auto bg-white p-6 rounded-2xl border-2 border-blue-400 space-y-6 flex flex-col flex-grow w-full">
        <Header />
        <ChatWindow messages={messages} />
        <InputBar onSendMessage={processarResposta} />
      </div>
      <Footer />
    </div>
  );
}

export default Chatbot;
