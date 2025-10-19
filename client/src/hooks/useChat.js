import { useState } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Olá! Sou o Turi, seu assistente de viagens. Vou te ajudar a criar o roteiro perfeito! Para começar, qual será o seu destino?',
      timestamp: new Date()
    }
  ]);

  const [dadosViagem, setDadosViagem] = useState({
    destino: '',
    dataInicio: '',
    dataFim: '',
    perfilViajante: '',
    interesses: '',
    orcamento: ''
  });

  const [etapaAtual, setEtapaAtual] = useState('destino');

  const perguntas = {
    destino: 'Qual será o seu destino?',
    dataInicio: 'Qual a data de início da viagem? (formato: DD/MM/AAAA)',
    dataFim: 'Qual a data de fim da viagem? (formato: DD/MM/AAAA)',
    perfilViajante: 'Qual o seu perfil de viajante? (Aventureiro, Cultural, Relaxante, Gastronômico, etc.)',
    interesses: 'Quais são seus principais interesses? (museus, praias, vida noturna, natureza, etc.)',
    orcamento: 'Qual o seu orçamento aproximado para esta viagem? (em R$)'
  };

  const proximaEtapa = {
    destino: 'dataInicio',
    dataInicio: 'dataFim',
    dataFim: 'perfilViajante',
    perfilViajante: 'interesses',
    interesses: 'orcamento',
    orcamento: 'completo'
  };

  const adicionarMensagem = (texto, tipo = 'user') => {
    const novaMensagem = {
      id: Date.now(),
      type: tipo,
      text: texto,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, novaMensagem]);
    return novaMensagem;
  };
// função para processar a resposta do orcamento
  const processarResposta = (resposta) => {
    // mensagem do user
    adicionarMensagem(resposta, 'user');

    // validação do orçamento

    if (etapaAtual === 'orcamento') {
      // regex verifica se tem apenas numero
      const regexContemNumero = /\d/;

      if (!regexContemNumero.test(resposta)) {
        //se a validação falhar, ele vai pedir para inserir o orcamento usando numeros 
        setTimeout(() => {
          adicionarMensagem(
            'Por favor, digite o valor do orçamento usando números (ex: 500, R$ 500).',
            'bot'
          );
        }, 500); // delay para o bot responder
        
        
        return; 
      }
    }


    // Atualiza os dados da viagem
    setDadosViagem(prev => ({
      ...prev,
      [etapaAtual]: resposta
    }));

    // Verifica próxima etapa
    const proxima = proximaEtapa[etapaAtual];
    
    setTimeout(() => {
      if (proxima === 'completo') {
        adicionarMensagem(
          'Perfeito! Tenho todas as informações necessárias. Vou gerar seu roteiro personalizado! 🎯',
          'bot'
        );
        // Aqui você pode chamar a API para gerar o roteiro
        gerarRoteiro();
      } else {
        setEtapaAtual(proxima);
        adicionarMensagem(perguntas[proxima], 'bot');
      }
    }, 1000);
  };

  const gerarRoteiro = async () => {
    try {
      // Simula chamada para API
      setTimeout(() => {
        adicionarMensagem(
          'Roteiro gerado com sucesso! Baseado nas suas preferências, criei um roteiro incrível para você! 🌟',
          'bot'
        );
      }, 2000);
      
      // Aqui você faria a chamada real para sua API
      // const response = await fetch('/api/generate-trip', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(dadosViagem)
      // });
      
    } catch (error) {
      adicionarMensagem(
        'Ops, ocorreu um erro ao gerar seu roteiro. Tente novamente.',
        'bot'
      );
    }
  };

  return {
    messages,
    dadosViagem,
    etapaAtual,
    processarResposta,
    adicionarMensagem
  };
};