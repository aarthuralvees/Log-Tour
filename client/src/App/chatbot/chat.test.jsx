import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('axios', () => {
  const mockApiPost = vi.fn()
  return {
    default: {
      create: vi.fn(() => ({
        post: mockApiPost
      }))
    }
  }
})

vi.mock('../../components/Button/CustomButton', () => ({
  default: ({ onAction, disabled, children, ...props }) => (
    <button onClick={onAction} disabled={disabled} {...props}>
      {children}
    </button>
  )
}))

vi.mock('../../components/text_box/ChatBubble', () => ({
  default: ({ message, isUser }) => (
    <div data-testid={isUser ? 'user-message' : 'bot-message'}>
      {message}
    </div>
  )
}))

vi.mock('../../hooks/useChat', () => ({
  useChat: vi.fn()
}))

Element.prototype.scrollIntoView = vi.fn()

import Chatbot from './index'
import { useChat } from '../../hooks/useChat'

describe('Chatbot Page', () => {
  const mockMessages = [
    { id: 1, text: 'Olá! Bem-vindo ao Turi', type: 'bot' },
    { id: 2, text: 'Qual é seu destino?', type: 'bot' }
  ]

  const mockDadosViagem = {
    destino: '',
    dataInicio: '',
    dataFim: '',
    perfilViajante: '',
    interesses: [],
    orcamento: ''
  }

  const mockProcessarResposta = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useChat.mockReturnValue({
      messages: mockMessages,
      dadosViagem: mockDadosViagem,
      processarResposta: mockProcessarResposta
    })
  })

  describe('Testes de Renderização (Smoke Tests)', () => {
    it('renderiza o header com ícone do Turi', () => {
      render(<Chatbot />)
      
      expect(screen.getByText(/Turi, seu Assistente IA para Viagens/i)).toBeInTheDocument()
      expect(screen.getByAltText(/Turi, o assistente robô/i)).toBeInTheDocument()
    })

    it('exibe todas as mensagens do chat', () => {
      render(<Chatbot />)
      
      expect(screen.getByText('Olá! Bem-vindo ao Turi')).toBeInTheDocument()
      expect(screen.getByText('Qual é seu destino?')).toBeInTheDocument()
    })

    it('renderiza o campo de entrada com placeholder correto', () => {
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      expect(input).toBeInTheDocument()
    })

    it('renderiza com estrutura correta de layout', () => {
      const { container } = render(<Chatbot />)
      
      const mainContainer = container.querySelector('.max-w-screen-2xl')
      expect(mainContainer).toBeInTheDocument()
    })

    it('exibe footer com copyright', () => {
      render(<Chatbot />)
      
      expect(screen.getByText(/© LogTour 2025/i)).toBeInTheDocument()
    })

    it('renderiza sem mensagens quando lista está vazia', () => {
      useChat.mockReturnValue({
        messages: [],
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      render(<Chatbot />)
      expect(screen.queryByText('Olá! Bem-vindo ao Turi')).not.toBeInTheDocument()
    })

    it('renderiza múltiplas mensagens de diferentes tipos', () => {
      const mixedMessages = [
        { id: 1, text: 'Mensagem do bot', type: 'bot' },
        { id: 2, text: 'Mensagem do usuário', type: 'user' },
        { id: 3, text: 'Outra mensagem do bot', type: 'bot' }
      ]
      
      useChat.mockReturnValue({
        messages: mixedMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      render(<Chatbot />)
      expect(screen.getByText('Mensagem do bot')).toBeInTheDocument()
      expect(screen.getByText('Mensagem do usuário')).toBeInTheDocument()
      expect(screen.getByText('Outra mensagem do bot')).toBeInTheDocument()
    })
  })

  describe('Testes de Interação (Integration Tests)', () => {
    it('envia mensagem ao clicar no botão de envio', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.type(input, 'Quero ir para Recife')
      expect(input).toHaveValue('Quero ir para Recife')
      
      const sendButton = screen.getByRole('button')
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(mockProcessarResposta).toHaveBeenCalledWith('Quero ir para Recife')
      })
      expect(input).toHaveValue('')
    })

    it('envia mensagem ao pressionar Enter', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.type(input, 'Viagem para Salvador')
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(mockProcessarResposta).toHaveBeenCalledWith('Viagem para Salvador')
      })
    })

    it('limpa o input após enviar mensagem', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.type(input, 'Teste')
      const sendButton = screen.getByRole('button')
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(input).toHaveValue('')
      })
    })

    it('permite múltiplas interações sequenciais', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      const sendButton = screen.getByRole('button')
      
      await user.type(input, 'Primeira mensagem')
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(mockProcessarResposta).toHaveBeenCalledWith('Primeira mensagem')
      })
      
      await user.type(input, 'Segunda mensagem')
      await user.click(sendButton)
      
      await waitFor(() => {
        expect(mockProcessarResposta).toHaveBeenCalledWith('Segunda mensagem')
      })
      
      expect(mockProcessarResposta).toHaveBeenCalledTimes(2)
    })

    it('mantém foco no input após enviar mensagem', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.click(input)
      await user.type(input, 'Teste')
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(document.activeElement).toBe(input)
      })
    })
  })

  describe('Testes de Validação de Entrada (Boundary Tests)', () => {
    it('não envia mensagem vazia', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const sendButton = screen.getByRole('button')
      await user.click(sendButton)
      
      expect(mockProcessarResposta).not.toHaveBeenCalled()
    })

    it('não envia mensagem com apenas espaços em branco', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      const sendButton = screen.getByRole('button')
      
      await user.type(input, '   ')
      await user.click(sendButton)
      
      expect(mockProcessarResposta).not.toHaveBeenCalled()
    })

    it('aceita mensagem com um único caractere', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.type(input, 'A')
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(mockProcessarResposta).toHaveBeenCalledWith('A')
      })
    })

    it('aceita mensagem muito longa', async () => {
      render(<Chatbot />)
      
      const longMessage = 'Esta é uma mensagem muito longa para testar o limite de entrada'
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: longMessage } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      expect(mockProcessarResposta).toHaveBeenCalledWith(longMessage)
    }, 10000)

    it('aceita mensagem com caracteres especiais', async () => {
      render(<Chatbot />)
      
      const specialMessage = '!@#$%^&*()'
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: specialMessage } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      expect(mockProcessarResposta).toHaveBeenCalledWith(specialMessage)
    })

    it('não envia mensagem com apenas tabs e quebras de linha', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: '\t\n\r  ' } })
      await user.keyboard('{Enter}')
      
      expect(mockProcessarResposta).not.toHaveBeenCalled()
    })

    it('remove espaços extras antes de enviar', async () => {
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: '  Mensagem com espaços  ' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      expect(mockProcessarResposta).toHaveBeenCalledWith('Mensagem com espaços')
    })
  })

  describe('Testes de Gerenciamento de Estado', () => {
    it('scroll para mensagem mais recente', async () => {
      const newMessages = [...mockMessages, { id: 3, text: 'Nova mensagem', type: 'bot' }]
      
      useChat.mockReturnValue({
        messages: newMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      const { rerender } = render(<Chatbot />)
      
      rerender(<Chatbot />)
      
      expect(screen.getByText('Nova mensagem')).toBeInTheDocument()
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
    })

    it('atualiza a lista de mensagens dinamicamente', () => {
      const { rerender } = render(<Chatbot />)
      
      expect(screen.getByText('Olá! Bem-vindo ao Turi')).toBeInTheDocument()
      expect(screen.queryByText('Mensagem nova')).not.toBeInTheDocument()
      
      const updatedMessages = [...mockMessages, { id: 3, text: 'Mensagem nova', type: 'user' }]
      useChat.mockReturnValue({
        messages: updatedMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      rerender(<Chatbot />)
      
      expect(screen.getByText('Mensagem nova')).toBeInTheDocument()
    })

    it('mantém estado do input ao adicionar novas mensagens', async () => {
      const user = userEvent.setup()
      const { rerender } = render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: 'Digitando...' } })
      
      const updatedMessages = [...mockMessages, { id: 3, text: 'Bot responde', type: 'bot' }]
      useChat.mockReturnValue({
        messages: updatedMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      rerender(<Chatbot />)
      
      expect(input.value).toBe('Digitando...')
    })
  })

  describe('Testes de Acessibilidade', () => {
    it('botão de envio tem role correto', () => {
      render(<Chatbot />)
      
      const sendButton = screen.getByRole('button')
      expect(sendButton).toBeInTheDocument()
    })

    it('input é focável via Tab', async () => {
      const user = userEvent.setup()
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      await user.tab()
      
      expect(document.activeElement).toBe(input)
    })

    it('imagem do Turi tem texto alternativo', () => {
      render(<Chatbot />)
      
      const image = screen.getByAltText(/Turi, o assistente robô/i)
      expect(image).toHaveAttribute('alt')
    })
  })

  describe('Testes de Integração com useChat Hook', () => {
    it('utiliza dados de dadosViagem do hook', () => {
      const customDadosViagem = {
        destino: 'Recife',
        dataInicio: '2025-01-01',
        dataFim: '2025-01-10',
        perfilViajante: 'aventureiro',
        interesses: ['praia', 'cultura'],
        orcamento: '5000'
      }
      
      useChat.mockReturnValue({
        messages: mockMessages,
        dadosViagem: customDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      render(<Chatbot />)
      
      expect(useChat).toHaveBeenCalled()
    })

    it('chama processarResposta com texto correto', async () => {
      vi.clearAllMocks()
      useChat.mockReturnValue({
        messages: mockMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      render(<Chatbot />)
      
      const input = screen.getByPlaceholderText('Digite sua resposta...')
      
      fireEvent.change(input, { target: { value: 'Teste integração' } })
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      expect(mockProcessarResposta).toHaveBeenCalledTimes(1)
      expect(mockProcessarResposta).toHaveBeenCalledWith('Teste integração')
    })

    it('hook é chamado apenas uma vez na montagem', () => {
      render(<Chatbot />)
      
      expect(useChat).toHaveBeenCalledTimes(1)
    })
  })

  describe('Testes de Performance', () => {
    it('renderiza lista grande de mensagens sem erros', () => {
      const manyMessages = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        text: `Mensagem ${i}`,
        type: i % 2 === 0 ? 'bot' : 'user'
      }))
      
      useChat.mockReturnValue({
        messages: manyMessages,
        dadosViagem: mockDadosViagem,
        processarResposta: mockProcessarResposta
      })
      
      const { container } = render(<Chatbot />)
      
      expect(container).toBeInTheDocument()
      expect(screen.getByText('Mensagem 0')).toBeInTheDocument()
      expect(screen.getByText('Mensagem 99')).toBeInTheDocument()
    })
  })
})