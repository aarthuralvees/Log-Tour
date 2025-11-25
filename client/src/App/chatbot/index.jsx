import React, { useState, useRef, useEffect } from 'react';
import robotIcon from '../../assets/turi1.png';
import { AiOutlinePlus, AiOutlineSend, AiOutlineArrowLeft } from 'react-icons/ai';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatBubble from '../../components/text_box/ChatBubble';
import { CustomButton } from '../../components/Button/CustomButton';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-6 bg-gradient-to-r from-borrow to-blue-600 rounded-2xl shadow-lg">
      <button
        onClick={() => navigate(isAuthenticated ? '/home-logado' : '/')}
        className="flex items-center gap-2 text-white hover:bg-white/20 rounded-lg px-3 py-2 transition-colors"
      >
        <AiOutlineArrowLeft className="text-xl" />
        <span className="hidden sm:inline font-nunito">Voltar</span>
      </button>

      <div className="flex items-center gap-4">
        <img 
          src={robotIcon} 
          alt="Turi" 
          className="w-16 h-16 rounded-full bg-white p-2 shadow-md"
        />
        <div className="text-white">
          <h1 className="text-2xl md:text-3xl font-bold font-rokkitt">
            Turi
          </h1>
          <p className="text-sm text-blue-100 font-nunito">
            Seu Assistente de Viagens
          </p>
        </div>
      </div>

      <div className="w-20"></div>
    </header>
  );
};

const ChatWindow = ({ messages }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <main className="flex-grow overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-blue-50/50 to-transparent rounded-xl">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <img 
            src={robotIcon} 
            alt="Turi" 
            className="w-24 h-24 opacity-50"
          />
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-rokkitt mb-2">
              Olá! Eu sou o Turi 👋
            </h3>
            <p className="text-zinc-500 font-nunito max-w-md">
              Estou aqui para ajudar a planejar a viagem perfeita para você e seu grupo. 
              Pode me contar sobre seus planos?
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message.text}
              isUser={message.type === 'user'}
            />
          ))}
        </>
      )}
      <div ref={messagesEndRef} />
    </main>
  );
};

const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  
  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      setIsLoading(true);
      await onSendMessage(trimmedMessage);
      setMessage('');
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isMessageEmpty = !message.trim();

  return (
    <div className="p-4 bg-white border-t-2 border-blue-100 rounded-b-2xl">
      <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 border-2 border-blue-200 focus-within:border-borrow transition-colors">
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 font-nunito"
          aria-label="Campo de entrada de mensagem"
        />
        
        <button
          onClick={handleSend}
          disabled={isMessageEmpty || isLoading}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-borrow to-blue-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
          aria-label={isMessageEmpty ? "Escreva algo primeiro" : "Enviar mensagem"}
          type="button"
        >
          {isLoading ? (
            <div className="animate-spin text-xl">⟳</div>
          ) : isMessageEmpty ? (
            <AiOutlinePlus className="text-xl" />
          ) : (
            <AiOutlineSend className="text-xl" />
          )}
        </button>
      </div>
      
      <p className="text-xs text-zinc-400 text-center mt-2 font-nunito">
        Pressione Enter para enviar • Shift + Enter para nova linha
      </p>
    </div>
  );
};

const Footer = () => (
  <footer className="text-center text-zinc-400 text-sm py-4 font-nunito">
    <p>© LogTour 2025 • Desenvolvido com ❤️ para viajantes</p>
  </footer>
);

function Chatbot() {
  const { messages, processarResposta } = useChat();

  return (
    <div className="bg-background min-h-screen p-4 sm:p-8 flex flex-col">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-blue-100 overflow-hidden flex flex-col w-full h-[calc(100vh-4rem)]">
        <Header />
        <ChatWindow messages={messages} />
        <InputBar onSendMessage={processarResposta} />
      </div>
      <Footer />
    </div>
  );
}

export default Chatbot;
