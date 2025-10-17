import React, { useState, useEffect } from "react";
import ItineraryItem from "./ItineraryItem";

// SIMULAÇÃO DA API
// Substituir pela chamada de API real
async function fetchItineraryData() {
  // Simula um atraso na rede para que o estado de 'loading' (carregamento) possa ser visto na interface do usuário.
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Dados mockados (fictícios) 
  return {
    checklist: [
      { id: 1, title: "Passaportes", description: "Verifique validade superior a 6 meses para toda a família." },
      { id: 2, title: "Ingressos", description: "Garanta seus ingressos antecipados para o museu e shows." },
      { id: 3, title: "Moeda", description: "Leve alguns Euros em espécie e cartões desbloqueados." },
      { id: 4, title: "Seguro Viagem", description: "Confirme a cobertura internacional e contatos de emergência." },
    ],

    resumo: {
      datas: "Sábado, 11 de Outubro de 2025 a Sábado, 18 de Outubro de 2025 (7 Noites)",
      outrasInfo: "A temperatura média esperada é de 18°C. Não esqueça um casaco leve.",
    },

    roteiro: {
      manha: [
        { time: "08:00", title: "Embarque no Voo TZ-205", description: "Chegar 2h antes no portão B15.", location: "Aeroporto Internacional (GRU)", link: "http://voo.com" },
        { time: "12:00", title: "Almoço Rápido", description: "Sugerimos o 'Pasta Express' próximo ao hotel.", location: "Ristorante Bella Italia", link: "http://pastaexpress.com" },
      ],

      tarde: [
        { time: "15:00", title: "Check-in no Hotel", description: "Retire as chaves e deixe as malas.", location: "Hotel Elegance - Quarto 305" },
        { time: "17:00", title: "Passeio pela Piazza Vecchia", description: "Primeira exploração da cidade e fotos.", location: "Piazza Vecchia, Centro Storico" },
      ],

      noite: [
        { time: "20:00", title: "Jantar de Boas-vindas", description: "Cozinha local. Reserva em nome de 'Silva'.", location: "Trattoria del Sole" },
      ]
    },
  };
}



// Componente principal da página de roteiro
function RoteiroPage() {
  // 1. Estado para armazenar os dados do roteiro. Inicialmente é 'null'.
  const [itineraryData, setItineraryData] = useState(null);
  // 2. Estado para indicar se os dados estão sendo carregados (mostra o 'spinner' ou mensagem de loading).
  const [isLoading, setIsLoading] = useState(true);
  // 3. Estado para armazenar mensagens de erro, caso a chamada à API falhe.
  const [error, setError] = useState(null);

  // Hook useEffect: Responsável por gerenciar os 'efeitos colaterais', como a busca de dados.
  useEffect(() => {
    let isMounted = true;

    // Inicializa os estados de carregamento e erro antes de iniciar a busca
    setIsLoading(true);
    setError(null);

    // Inicia a busca dos dados da API
    fetchItineraryData()
      .then(data => {
        // Verifica se o componente ainda está montado antes de atualizar o estado.
        if (isMounted) {
          setItineraryData(data); // Atualiza os dados do roteiro.
          setIsLoading(false);    // Desativa o estado de carregamento.
        }
      })
      .catch(err => {
        console.error("Erro ao carregar roteiro:", err);
        // Verifica se o componente ainda está montado antes de atualizar o estado de erro.
        if (isMounted) {
          setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
          setIsLoading(false); // Desativa o estado de carregamento.
        }
      });

    return () => {
      isMounted = false;
    };
  }, []); 


  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6 flex justify-center items-center">
        <p className="text-xl text-red-600 font-semibold">{error}</p>
      </div>
    );
  }


  const data = itineraryData || {};
  const { checklist, resumo, roteiro } = data;


  // Estrutura principal da página (JSX)
  return (
    // Container principal com fundo gradiente (Tailwind CSS)
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">

      {/* HEADER: Título e introdução da página */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">LogTour</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Seu Roteiro Personalizado por Turi!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Olá! Foi um prazer planejar essa viagem com você. Preparei tudo de forma detalhada para que você não precise se preocupar com nada. Boa viagem!
        </p>
      </header>

      {/* CHECKLIST */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">
          Checklist de Preparo para a Viagem
        </h3>

        {/* Renderização Condicional: Mostra "Carregando" enquanto `isLoading` for true */}
        {isLoading ? (
          <p className="text-gray-500 text-sm italic">Carregando checklist...</p>
        ) : (
          <ul className="space-y-3">
            {/* Verifica se o checklist existe e tem itens. */}
            {checklist && checklist.length > 0 ? (
              // Mapeia o array `checklist` para criar uma lista de itens (usando `<li>`).
              checklist.map((item) => (
                <li key={item.id} className="border-l-4 border-blue-500 pl-3">
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </li>
              ))
            ) : (
              // Mensagem se o checklist estiver vazio ou não for carregado (após o loading)
              <p className="text-gray-500 text-sm italic">Nenhum item de checklist disponível.</p>
            )}
          </ul>
        )}
      </section>

      {/* RESUMO GERAL */}
      <section className="bg-white rounded-2xl shadow-md p-6 mb-8 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">
          Resumo Geral & Links Principais
        </h3>

        {/* Renderização Condicional para o Resumo */}
        {isLoading ? (
          <p className="text-gray-500">Carregando resumo...</p>
        ) : (
          <>
            <p className="text-gray-700 mb-2">
              <strong>Datas de Viagem:</strong> {resumo?.datas || "Indisponível"}
            </p>
            <p className="text-gray-700 text-sm italic">
              {resumo?.outrasInfo}
            </p>
          </>
        )}
      </section>

      {/* ROTEIRO DETALHADO */}
      <section className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-blue-600 mb-4">Roteiro Detalhado</h3>

        {/* Renderização Condicional para o Roteiro */}
        {isLoading ? (
          <p className="text-gray-500 text-sm italic">Carregando roteiro completo...</p>
        ) : (
          <>
            {/* Sessão Manhã */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Manhã</h4>
              <div className="space-y-4">
                {/* Mapeia os itens da manhã, passando cada item como props para o componente `ItineraryItem` */}
                {roteiro?.manha && roteiro.manha.length > 0 ? (
                  roteiro.manha.map((item, index) => (
                    // O `key` é importante para a performance do React
                    <ItineraryItem key={index} {...item} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">Nenhum evento na manhã.</p>
                )}
              </div>
            </div>

            {/* Sessão Tarde (Estrutura idêntica à Manhã) */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Tarde</h4>
              <div className="space-y-4">
                {roteiro?.tarde && roteiro.tarde.length > 0 ? (
                  roteiro.tarde.map((item, index) => (
                    <ItineraryItem key={index} {...item} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">Nenhum evento na tarde.</p>
                )}
              </div>
            </div>

            {/* Sessão Noite (Estrutura idêntica à Manhã e Tarde) */}
            <div className="mb-6">
              <h4 className="text-md font-semibold text-gray-800 mb-3">Noite</h4>
              <div className="space-y-4">
                {roteiro?.noite && roteiro.noite.length > 0 ? (
                  roteiro.noite.map((item, index) => (
                    <ItineraryItem key={index} {...item} />
                  ))
                ) : (
                  <p className="text-gray-500 text-sm italic">Nenhum evento à noite.</p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default RoteiroPage;