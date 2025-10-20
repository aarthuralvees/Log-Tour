import React, { useState } from 'react';
import { CustomButton } from '../../components/Button/CustomButton.jsx';
import { Modal } from '../../components/Modal';
function BotaoLista() {
  const [Modal_aberto, setModalaberto] = useState(false);

  const Modalaberto = () => {
    setModalaberto(true);
  };

  const Modalfechado = () => {
    setModalaberto(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Log Tour</h1>
      
      <CustomButton
        label="Gastos da Viagem"
        variant="borrow"
        width="w-1/7" // Corrigi para uma classe válida
        className="rounded-lg px-4 py-2" // Adicionado bordas arredondadas e padding
        onAction={Modalaberto}
      >
      </CustomButton>

      {/* Modal */}
      <Modal isOpen={Modal_aberto} setOpen={setModalaberto}>
        <h2 className="text-2xl font-bold mb-4">Diga qual o valor a ser gasto na viagem</h2>
        <p className="mb-4">Digite o valor que você pretende gastar nesta viagem.</p>
        
        {/* Adicione um input para o valor */}
        <input 
          type="number" 
          placeholder="R$ 0,00"
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        
        {/* Botões de ação */}
        <div className="flex justify-end gap-2">
          <CustomButton
            label="Cancelar"
            variant="gray"
            width="w-auto"
            className="px-4 py-2 rounded"
            onAction={Modalfechado}
          />
          <CustomButton
            label="Confirmar"
            variant="borrow"
            width="w-auto"
            className="px-4 py-2 rounded"
            onAction={() => {
              // Lógica para salvar o valor
              console.log('Valor salvo!');
              Modalfechado();
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

export default BotaoLista;

