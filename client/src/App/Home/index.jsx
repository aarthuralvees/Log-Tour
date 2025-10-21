import { CustomButton } from '../../components/Button/CustomButton'; 
import { CartaoDeApresentacao } from '../../components/CartaoDeApresentacao';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
   <div className='bg-background min-h-screen'>

      <div className="Hero flex items-center justify-center text-center px-4 gap-2">
        <div className='LogTour align-center flex flex-col items-center gap-4 mt-5'>
          <img src="/icons/imagem4.svg" alt="Símbolo LogTour" />
          <h1 className='font-rokkitt font-bold text-borrow text-7xl'>LogTour</h1>
        </div>

        <div className='TextoHero flex flex-col items-center gap-4 mt-16'>
          <h2 className='font-rokkitt font-bold text-slate-900 text-5xl'>Um site para o planejamento de suas viagens em grupo</h2>
          <p className='text-zinc-500 text pb-4 text-lg'>
            Crie roteiros que conciliam interesses diversos e organizam toda a logística da sua viagem  em um único lugar.
          </p>
          <CustomButton label="Começar" variant="white" width='w-auto'
          className=' bg-white rounded-full px-6 py-2 border-2 border-borrow text-borrow scale-150 hover:bg-borrow shadow-md
          hover:text-white transition-all'
          onClick = {() => navigate('/chatbot')}
          />
        </div>

      </div>

      
      <div className='Section p-6  mt-10 text-center relative'>
          <h2 className='font-rokkitt text-borrow text-4xl pt-8'>
          Um roteiro para cada gosto, com a facilidade que você precisa.
          </h2>

         <div className="relative w-full flex justify-center items-center"> 
          
          <div 
            className="
              absolute 
              inset-x-20 
              top-10
              bottom-10
              border-4 
              border-blue-300 
              border-
              rounded-3xl
              z-0
              scale-50
            "
          ></div>


        <div className='Grid-responsivel grid grid-cols-5 grid-rows-3 p-2 gap-10 scale-[0.85] justify-center items-center relative z-10'>
            <CartaoDeApresentacao 
            title="Conheça Turi, seu Guia Pessoal"
            description="A missão dele é transformar as ideias do seu grupo em um roteiro de viagem. 
            Ele descobre o plano ideal, mesmo que vocês ainda não saibam o que procurar."
            iconUrl="/icons/imagem3.svg"
            iconPosition='left'
            layout='horizontal'
            className='flex justify-center col-span-3'
            />

            <CartaoDeApresentacao 
            title="Cada um quer uma coisa diferente na viagem?"
            description=" Converse com o Turi. Ele dá atenção especial aos interesses de cada um, 
            das crianças aos adultos, para garantir que a experiência seja incrível para todos."
            iconUrl="/icons/imagem5.png"
            iconPosition='left'
            layout='vertical'
            className='flex justify-center col-span-2 row-span-2'
            />

            <CartaoDeApresentacao 
            title="Medo de imprevistos estragarem a viagem? "
            description=" O Turi pensa em tudo por você. Ele sincroniza as informações de transporte, 
            horários, clima e localização para criar um roteiro à prova de incidentes."
            iconUrl="/icons/imagem1.svg"
            iconPosition='left'
            layout='horizontal'
            className='row-start-3 col-start-3 col-span-3'
            />

            <CartaoDeApresentacao 
            title="Falar de dinheiro com o grupo é complicado?"
            description="O Turi resolve!  Ele ajuda a estimar os custos das atividades, garantindo 
            que o plano caiba no bolso do grupo e que todos fiquem alinhados."
            iconUrl="/icons/imagem2.svg"
            iconPosition='left'
            layout='vertical'
            className='flex justify-center col-span-2 row-span-2'
            />

        </div>

      </div>

      <footer className="w-full text-center text-sm text-gray-500">
        © LogTour 2025
      </footer>

    </div>
  </div>

  );
}

export default Home;

