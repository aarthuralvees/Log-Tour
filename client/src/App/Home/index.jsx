import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../../components/Button/CustomButton.tsx';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Log Tour
      </h1>
      <CustomButton 
        label="Navegar"
        variant="dark"
        width="w-1/7" // Corrigi para uma classe válida
        className="rounded-lg px-4 py-2" // Adicionado bordas arredondadas e padding
        onAction={() => navigate('/chatbot')}
      />
    </div>
  );
}

export default Home;

