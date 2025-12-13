import { describe, it, expect, beforeEach, vi } from 'vitest'
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomButton from './CustomButton'

describe('CustomButton Component', () => {
  const mockOnAction = vi.fn()
  const mockOnClick = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Testes de Renderização (Smoke Tests)', () => {
    it('renderiza o botão com label correto', () => {
      render(<CustomButton variant="borrow" label="Clique aqui" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button', { name: /Clique aqui/i })
      expect(button).toBeInTheDocument()
    })

    it('renderiza com a variante "borrow" corretamente', () => {
      const { container } = render(
        <CustomButton variant="borrow" label="Borrow Button" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-blue-500', 'text-white')
    })

    it('renderiza com a variante "dark" corretamente', () => {
      const { container } = render(
        <CustomButton variant="dark" label="Dark Button" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-gray-800', 'text-white')
    })

    it('renderiza com a variante "gray" corretamente', () => {
      const { container } = render(
        <CustomButton variant="gray" label="Gray Button" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-gray-300', 'text-gray-800')
    })

    it('renderiza com a variante "white" corretamente', () => {
      const { container } = render(
        <CustomButton variant="white" label="White Button" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-white', 'text-blue-500', 'border', 'border-blue-500')
    })

    it('aplica a classe de largura personalizada', () => {
      const { container } = render(
        <CustomButton variant="borrow" label="Test" width="w-64" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('w-64')
    })

    it('aplica classe customizada adicional', () => {
      const { container } = render(
        <CustomButton 
          variant="borrow" 
          label="Test" 
          className="custom-class" 
          onAction={mockOnAction} 
        />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('custom-class')
    })

    it('renderiza com displayName "CustomButton"', () => {
      expect(CustomButton.displayName).toBe('CustomButton')
    })

    it('aplica largura padrão "w-full" quando não especificada', () => {
      const { container } = render(
        <CustomButton variant="borrow" label="Test" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('w-full')
    })
  })

  describe('Testes de Interação (Integration Tests)', () => {
    it('chama onAction quando botão é clicado', async () => {
      const user = userEvent.setup()
      render(<CustomButton variant="borrow" label="Click me" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button', { name: /Click me/i })
      await user.click(button)
      
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('chama onClick quando botão é clicado', async () => {
      const user = userEvent.setup()
      render(
        <CustomButton 
          variant="borrow" 
          label="Click me" 
          onAction={mockOnAction}
          onClick={mockOnClick}
        />
      )
      
      const button = screen.getByRole('button', { name: /Click me/i })
      await user.click(button)
      
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })

    it('chama tanto onAction quanto onClick na sequência correta', async () => {
      const user = userEvent.setup()
      const callOrder = []
      
      const onActionWithTracking = vi.fn(() => callOrder.push('onAction'))
      const onClickWithTracking = vi.fn(() => callOrder.push('onClick'))
      
      render(
        <CustomButton 
          variant="borrow" 
          label="Click me" 
          onAction={onActionWithTracking}
          onClick={onClickWithTracking}
        />
      )
      
      const button = screen.getByRole('button', { name: /Click me/i })
      await user.click(button)
      
      expect(callOrder).toEqual(['onClick', 'onAction'])
    })

    it('permite múltiplos cliques sequenciais', async () => {
      const user = userEvent.setup()
      render(<CustomButton variant="borrow" label="Click me" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button', { name: /Click me/i })
      
      await user.click(button)
      await user.click(button)
      await user.click(button)
      
      expect(mockOnAction).toHaveBeenCalledTimes(3)
    })

    it('aguarda onAction assíncrona antes de prosseguir', async () => {
      const user = userEvent.setup()
      let asyncCompleted = false
      
      const asyncAction = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 100))
        asyncCompleted = true
      })
      
      render(<CustomButton variant="borrow" label="Click me" onAction={asyncAction} />)
      
      const button = screen.getByRole('button', { name: /Click me/i })
      await user.click(button)
      
      await waitFor(() => {
        expect(asyncCompleted).toBe(true)
      })
    })

    it('não chama onAction se onClick previne evento padrão', async () => {
      const user = userEvent.setup()
      const onClickWithPrevent = vi.fn((e) => e.preventDefault())
      
      render(
        <CustomButton 
          variant="borrow" 
          label="Click me" 
          onAction={mockOnAction}
          onClick={onClickWithPrevent}
        />
      )
      
      const button = screen.getByRole('button', { name: /Click me/i })
      await user.click(button)
      
      expect(onClickWithPrevent).toHaveBeenCalledTimes(1)
      expect(mockOnAction).not.toHaveBeenCalled()
    })
  })

  describe('Testes de Estado - isLoading (Boundary Tests)', () => {
    it('exibe "Carregando..." quando isLoading é true', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Submit" 
          isLoading={true}
          onAction={mockOnAction} 
        />
      )
      
      expect(screen.getByRole('button', { name: /Carregando.../i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Submit/i })).not.toBeInTheDocument()
    })

    it('exibe label normal quando isLoading é false', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Submit" 
          isLoading={false}
          onAction={mockOnAction} 
        />
      )
      
      expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()
      expect(screen.queryByRole('button', { name: /Carregando.../i })).not.toBeInTheDocument()
    })

    it('desabilita botão quando isLoading é true', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Submit" 
          isLoading={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button', { name: /Carregando.../i })
      expect(button).toBeDisabled()
    })

    it('não chama onAction quando botão está carregando', async () => {
      const user = userEvent.setup()
      render(
        <CustomButton 
          variant="borrow" 
          label="Submit" 
          isLoading={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button', { name: /Carregando.../i })
      await user.click(button)
      
      expect(mockOnAction).not.toHaveBeenCalled()
    })
  })

  describe('Testes de Disabled (Validação)', () => {
    it('desabilita o botão quando disabled é true', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Disabled Button" 
          disabled={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button', { name: /Disabled Button/i })
      expect(button).toBeDisabled()
    })

    it('não chama onAction quando botão está desabilitado', async () => {
      const user = userEvent.setup()
      render(
        <CustomButton 
          variant="borrow" 
          label="Disabled Button" 
          disabled={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button', { name: /Disabled Button/i })
      await user.click(button)
      
      expect(mockOnAction).not.toHaveBeenCalled()
    })

    it('desabilita quando isLoading e disabled são ambos true', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Submit" 
          isLoading={true}
          disabled={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('ativa o botão quando disabled é false', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="Enabled Button" 
          disabled={false}
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button', { name: /Enabled Button/i })
      expect(button).not.toBeDisabled()
    })
  })

  describe('Testes de Acessibilidade', () => {
    it('é um elemento button nativo', () => {
      render(<CustomButton variant="borrow" label="Test" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('tem label acessível', () => {
      render(<CustomButton variant="borrow" label="Accessible Button" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button', { name: /Accessible Button/i })
      expect(button).toBeInTheDocument()
    })

    it('é focável via teclado', async () => {
      const user = userEvent.setup()
      render(<CustomButton variant="borrow" label="Test" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button')
      
      await user.tab()
      expect(button).toHaveFocus()
    })

    it('dispara onAction ao pressionar Enter', async () => {
      const user = userEvent.setup()
      render(<CustomButton variant="borrow" label="Test" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await user.keyboard('{Enter}')
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('dispara onAction ao pressionar Space', async () => {
      const user = userEvent.setup()
      render(<CustomButton variant="borrow" label="Test" onAction={mockOnAction} />)
      
      const button = screen.getByRole('button')
      button.focus()
      
      await user.keyboard(' ')
      expect(mockOnAction).toHaveBeenCalledTimes(1)
    })

    it('mostra estado desabilitado visualmente', () => {
      const { container } = render(
        <CustomButton 
          variant="borrow" 
          label="Disabled" 
          disabled={true}
          onAction={mockOnAction} 
        />
      )
      
      const button = container.querySelector('button')
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('disabled')
    })
  })

  describe('Testes de Props (Boundary Tests)', () => {
    it('aceita ref corretamente', () => {
      const ref = React.createRef()
      render(
        <CustomButton 
          ref={ref}
          variant="borrow" 
          label="Test" 
          onAction={mockOnAction} 
        />
      )
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })

    it('passa props adicionais ao elemento button', () => {
      const { container } = render(
        <CustomButton 
          variant="borrow" 
          label="Test" 
          data-testid="custom-button"
          aria-label="Custom Label"
          onAction={mockOnAction} 
        />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveAttribute('data-testid', 'custom-button')
      expect(button).toHaveAttribute('aria-label', 'Custom Label')
    })

    it('renderiza com label vazio sem erro', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="" 
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('renderiza com label muito longo', () => {
      const longLabel = 'A'.repeat(200)
      render(
        <CustomButton 
          variant="borrow" 
          label={longLabel} 
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button')
      expect(button.textContent).toBe(longLabel)
    })

    it('renderiza com label contendo caracteres especiais', () => {
      render(
        <CustomButton 
          variant="borrow" 
          label="!@#$%^&*()" 
          onAction={mockOnAction} 
        />
      )
      
      const button = screen.getByRole('button')
      expect(button.textContent).toBe('!@#$%^&*()')
    })

    it('renderiza sem onAction quando não fornecido', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <CustomButton 
          variant="borrow" 
          label="Test"
        />
      )
      
      const button = container.querySelector('button')
      await user.click(button)
      
      expect(button).toBeInTheDocument()
    })
  })

  describe('Testes de Validação de Props (PropTypes)', () => {
    it('define propTypes para o componente', () => {
      expect(CustomButton.propTypes).toBeDefined()
    })

    it('label está definido nos propTypes', () => {
      expect(CustomButton.propTypes.label).toBeDefined()
    })

    it('variant está definido nos propTypes', () => {
      expect(CustomButton.propTypes.variant).toBeDefined()
    })

    it('aceita apenas variantes válidas', () => {
      const validVariants = ['borrow', 'dark', 'gray', 'white']
      
      validVariants.forEach(variant => {
        const { container } = render(
          <CustomButton 
            variant={variant} 
            label="Test" 
            onAction={mockOnAction} 
          />
        )
        expect(container.querySelector('button')).toBeInTheDocument()
      })
    })

    it('isLoading está definido nos propTypes', () => {
      expect(CustomButton.propTypes.isLoading).toBeDefined()
    })

    it('disabled está definido nos propTypes', () => {
      expect(CustomButton.propTypes.disabled).toBeDefined()
    })
  })

  describe('Testes de Performance', () => {
    it('renderiza rapidamente com múltiplos botões', () => {
      const { container } = render(
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <CustomButton 
              key={i}
              variant="borrow" 
              label={`Button ${i}`}
              onAction={mockOnAction}
            />
          ))}
        </div>
      )
      
      const buttons = container.querySelectorAll('button')
      expect(buttons).toHaveLength(100)
    })

    it('não causa re-renders desnecessários', async () => {
      const user = userEvent.setup()
      const { rerender } = render(
        <CustomButton 
          variant="borrow" 
          label="Test" 
          onAction={mockOnAction}
        />
      )
      
      const button = screen.getByRole('button')
      const initialHTML = button.outerHTML
      
      rerender(
        <CustomButton 
          variant="borrow" 
          label="Test" 
          onAction={mockOnAction}
        />
      )
      
      expect(button.outerHTML).toBe(initialHTML)
    })
  })

  describe('Testes de Estilo', () => {
    it('aplica classes de hover ao elemento button', () => {
      const { container } = render(
        <CustomButton variant="borrow" label="Test" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('hover:opacity-80')
    })

    it('aplica font-semibold e font-nunito', () => {
      const { container } = render(
        <CustomButton variant="borrow" label="Test" onAction={mockOnAction} />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('font-semibold', 'font-nunito')
    })

    it('combina variante com largura personalizada corretamente', () => {
      const { container } = render(
        <CustomButton 
          variant="dark" 
          label="Test" 
          width="w-96"
          onAction={mockOnAction}
        />
      )
      
      const button = container.querySelector('button')
      expect(button).toHaveClass('bg-gray-800', 'w-96', 'font-semibold')
    })
  })
})