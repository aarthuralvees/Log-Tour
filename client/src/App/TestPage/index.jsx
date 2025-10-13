import { CartaoDeApresentacao } from '../../components/CartaoDeApresentacao';

export default function PaginaDeTeste() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-16">
      
      <h1 className="text-3xl font-extrabold text-blue-500">
        Um roteiro para cada gosto, com a facilidade que você precisa.
      </h1>
      
      <div className="mt-12 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        
        <CartaoDeApresentacao
          title="Conheça Turi, seu Guia Pessoal"
          description="A missão dele é transformar as ideias do seu grupo em um roteiro de viagem. Ele descobre o plano ideal, mesmo que vocês ainda não saibam o que procurar."
          iconUrl="/icons/imagem3.svg"
          iconPosition="left"
        />

        <CartaoDeApresentacao
          title="Cada um quer uma coisa diferente na viagem?"
          description="Converse com o Turi. Ele dá atenção especial aos interesses de cada um, das crianças aos adultos, para garantir que a experiência seja incrível para todos."
          iconUrl="/icons/imagem5.svg"
          iconPosition="right"
        />

        <CartaoDeApresentacao
          title="Falar de dinheiro com o grupo é complicado?"
          description="O Turi resolve! Ele ajuda a estimar os custos das atividades, garantindo que o plano caiba no bolso do grupo e que todos fiquem alinhados."
          iconUrl="/icons/imagem2.svg"
          iconPosition="left"
        />

        <CartaoDeApresentacao
          title="Medo de imprevistos estragarem a viagem?"
          description="O Turi pensa em tudo por você. Ele sincroniza as informações de transporte, horários, clima e localização para criar um roteiro à prova de incidentes."
          iconUrl="/icons/imagem1.svg"
          iconPosition="right"
        />
      </div>
    </main>
  );
}