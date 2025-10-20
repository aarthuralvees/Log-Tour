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

  const validarData = (data, verificarFutura = false) => {
    const formato_data = /^([0-3]?[0-9])\/([0-1]?[0-9])\/(\d{4})$/;
    const match = data.match(formato_data);

    if (!match) {
      return false;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10);
    const ano = parseInt(match[3], 10);

    const anoAtual = new Date().getFullYear();
    if (ano < anoAtual || ano > anoAtual + 20) {
      return false;
    }

    if (mes < 1 || mes > 12) {
      return false;
    }

    const data_obj = new Date(ano, mes - 1, dia);
    
    const dataValida = data_obj.getFullYear() === ano &&
           data_obj.getMonth() === mes - 1 &&
           data_obj.getDate() === dia;

    if (!dataValida) {
      return false;
    }

    if (verificarFutura) {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (data_obj < hoje) {
        return false;
      }
    }

    return true;
  };

  const validarSequenciaDatas = (dataInicio, dataFim) => {
    const [diaI, mesI, anoI] = dataInicio.split('/').map(Number);
    const [diaF, mesF, anoF] = dataFim.split('/').map(Number);
    
    const dataInicioObj = new Date(anoI, mesI - 1, diaI);
    const dataFimObj = new Date(anoF, mesF - 1, diaF);
    
    const sequenciaValida = dataFimObj >= dataInicioObj;
    
    return sequenciaValida;
  };
  
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
    orcamento: 'completo',
  };

  const adicionarMensagem = (text, type = 'bot') => {
    setMessages(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        type,
        text,
        timestamp: new Date()
      }
    ]);
  };

  const processarResposta = (resposta) => {
    adicionarMensagem(resposta, 'user');
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

    if (etapaAtual === 'dataInicio') {
      if (!validarData(resposta, true)) {
        setTimeout(() => {
          adicionarMensagem(
            'Data inválida! Por favor, digite uma data válida no formato DD/MM/AAAA (exemplo: 15/03/2025). Certifique-se de que seja uma data futura.',
            'bot'
          );
        }, 500);
        return;
      }
    }

    if (etapaAtual === 'dataFim') {
      if (!validarData(resposta, true)) {
        setTimeout(() => {
          adicionarMensagem(
            'Data inválida! Por favor, digite uma data válida no formato DD/MM/AAAA (exemplo: 20/03/2025). Certifique-se de que seja uma data futura.',
            'bot'
          );
        }, 500);
        return;
      }

      if (dadosViagem.dataInicio && !validarSequenciaDatas(dadosViagem.dataInicio, resposta)) {
        setTimeout(() => {
          adicionarMensagem(
            `A data de fim deve ser igual ou posterior à data de início (${dadosViagem.dataInicio}). Por favor, digite uma data válida.`,
            'bot'
          );
        }, 500);
        return;
      }
    }

    setDadosViagem(prev => ({
      ...prev,
      [etapaAtual]: resposta
    }));

    const proxima = proximaEtapa[etapaAtual];

    setTimeout(() => {
      if (proxima === 'completo') {
        adicionarMensagem(
          'Perfeito! Tenho todas as informações necessárias. Vou gerar seu roteiro personalizado! 🎯',
          'bot'
        );
        gerarRoteiro();
      } else {
        setEtapaAtual(proxima);
        adicionarMensagem(perguntas[proxima], 'bot');
      }
    }, 1000);
  };

  const gerarRoteiro = async () => {
    try {
      setTimeout(() => {
        adicionarMensagem(
          'Roteiro gerado com sucesso! Baseado nas suas preferências, criei um roteiro incrível para você! 🌟',
          'bot'
        );
        console.log('Dados finais da viagem:', dadosViagem);
      }, 2000);
      
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