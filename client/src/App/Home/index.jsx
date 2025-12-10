import React, { useState } from "react";
import { CustomButton } from '../../components/Button/CustomButton';
import { CartaoDeApresentacao } from '../../components/CartaoDeApresentacao';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext'; // REMOVED
import { AuthModal } from '../../components/modalCadastro';

function Home() {
  const navigate = useNavigate();
  // const { login } = useAuth(); // REMOVED
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleStartWithoutLogin = () => {
    navigate('/chatbot');
  };

  const handleLoginSuccess = (userData) => {
    // Since we removed the context hook, we save the data manually to localStorage
    // so the rest of the app knows we are logged in.
    if (userData) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    // Navigate to the logged-in area
    navigate('/home-logado');
  };

  return (
    <div className='bg-background min-h-screen'>
      <header className='bg-white shadow-sm border-b border-blue-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center py-4'>
            <div className='flex items-center gap-3'>
              <img src="/icons/imagem4.svg" alt="LogTour" className='w-10 h-10' />
              <h1 className='font-rokkitt font-bold text-borrow text-3xl'>LogTour</h1>
            </div>

            <div className='flex items-center gap-3'>
              <CustomButton 
                label="Login" 
                variant="white" 
                width='w-auto'
                className='px-6 py-2 rounded-lg hidden sm:block'
                onClick={() => setAuthModalOpen(true)}
              />
              <CustomButton 
                label="Cadastrar" 
                variant="white" 
                width='w-auto'
                className='px-6 py-2 rounded-lg hidden sm:block'
                onClick={() => setAuthModalOpen(true)}
              />
              <CustomButton 
                label="Entrar sem Login" 
                variant="borrow" 
                width='w-auto'
                className='px-6 py-2 rounded-lg'
                onClick={handleStartWithoutLogin}
              />
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <section className="Hero text-center py-16">
          <div className='flex flex-col items-center gap-6'>
            <img src="/icons/imagem4.svg" alt="Símbolo LogTour" className='w-24 h-24' />
            
            <h1 className='font-rokkitt font-bold text-borrow text-6xl md:text-7xl'>
              LogTour
            </h1>

            <h2 className='font-rokkitt font-bold text-slate-900 text-3xl md:text-5xl max-w-4xl'>
              Um site para o planejamento de suas viagens em grupo
            </h2>
            
            <p className='text-zinc-500 text-lg md:text-xl max-w-3xl'>
              Crie roteiros que conciliam interesses diversos e organizam toda a logística da sua viagem em um único lugar.
            </p>
            
            <div className='flex flex-col sm:flex-row gap-4 mt-6'>
              <CustomButton 
                label="Começar Agora" 
                variant="borrow" 
                width='w-auto'
                className='px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform'
                onClick={() => setAuthModalOpen(true)}
              />
              
              <CustomButton 
                label="Experimentar sem Login" 
                variant="white" 
                width='w-auto'
                className='px-8 py-3 rounded-full text-lg font-bold shadow-md hover:scale-105 transition-transform'
                onClick={handleStartWithoutLogin}
              />
            </div>
          </div>
        </section>

        <section className='py-16'>
          <h2 className='font-rokkitt text-borrow text-4xl md:text-5xl font-bold text-center mb-12'>
            Um roteiro para cada gosto, com a facilidade que você precisa.
          </h2>

          <div className="relative w-full">
            <div 
              className="
                absolute 
                inset-x-4 
                md:inset-x-20 
                top-10
                bottom-10
                border-4 
                border-blue-200 
                rounded-3xl
                z-0
                hidden
                lg:block
              "
            />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-3 gap-6 lg:gap-10 relative z-10 p-4'>
              <div className='lg:col-span-3 lg:row-span-1'>
                <CartaoDeApresentacao 
                  title="Conheça Turi, seu Guia Pessoal"
                  description="A missão dele é transformar as ideias do seu grupo em um roteiro de viagem. Ele descobre o plano ideal, mesmo que vocês ainda não saibam o que procurar."
                  iconUrl="/icons/imagem3.svg"
                  iconPosition='left'
                  layout='horizontal'
                  className='h-full'
                />
              </div>

              <div className='lg:col-span-2 lg:row-span-2'>
                <CartaoDeApresentacao 
                  title="Cada um quer uma coisa diferente na viagem?"
                  description="Converse com o Turi. Ele dá atenção especial aos interesses de cada um, das crianças aos adultos, para garantir que a experiência seja incrível para todos."
                  iconUrl="/icons/imagem5.png"
                  iconPosition='left'
                  layout='vertical'
                  className='h-full'
                />
              </div>

              <div className='lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-2'>
                <CartaoDeApresentacao 
                  title="Falar de dinheiro com o grupo é complicado?"
                  description="O Turi resolve! Ele ajuda a estimar os custos das atividades, garantindo que o plano caiba no bolso do grupo e que todos fiquem alinhados."
                  iconUrl="/icons/imagem2.svg"
                  iconPosition='left'
                  layout='vertical'
                  className='h-full'
                />
              </div>

              <div className='lg:col-span-3 lg:row-span-1 lg:col-start-3 lg:row-start-3'>
                <CartaoDeApresentacao 
                  title="Medo de imprevistos estragarem a viagem?"
                  description="O Turi pensa em tudo por você. Ele sincroniza as informações de transporte, horários, clima e localização para criar um roteiro à prova de incidentes."
                  iconUrl="/icons/imagem1.svg"
                  iconPosition='left'
                  layout='horizontal'
                  className='h-full'
                />
              </div>
            </div>
          </div>
        </section>

        <section className='py-16'>
          <div className='bg-gradient-to-r from-borrow to-blue-600 text-white rounded-2xl p-8 md:p-12 shadow-xl text-center'>
            <h3 className='font-rokkitt text-3xl md:text-4xl font-bold mb-4'>
              Pronto para começar sua aventura?
            </h3>
            <p className='text-blue-100 font-nunito text-lg md:text-xl mb-6 max-w-2xl mx-auto'>
              Junte-se a milhares de viajantes que já planejaram suas viagens perfeitas com o LogTour
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <CustomButton 
                label="Criar Conta Grátis" 
                variant="white" 
                width='w-auto'
                className='px-8 py-3 rounded-full text-lg font-bold shadow-md hover:scale-105 transition-transform'
                onClick={() => setAuthModalOpen(true)}
              />
              <CustomButton 
                label="Conversar com Turi" 
                variant="dark" 
                width='w-auto'
                className='px-8 py-3 rounded-full text-lg font-bold shadow-md hover:scale-105 transition-transform bg-white/20 hover:bg-white/30 border-2 border-white'
                onClick={handleStartWithoutLogin}
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full text-center text-sm text-gray-500 py-8 border-t border-blue-100">
        © LogTour 2025
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        setOpen={setAuthModalOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default Home;