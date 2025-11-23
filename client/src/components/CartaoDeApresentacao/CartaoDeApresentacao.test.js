// CartaoDeApresentacao.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { CartaoDeApresentacao } from './CartaoDeApresentacao'; // Assumindo que o componente está no mesmo diretório

// Dados de teste comuns
const mockProps = {
  title: 'Planeje Sua Aventura',
  description: 'Crie um guia de viagem personalizado em minutos.',
  iconUrl: '/caminho/para/icone.svg',
  className: 'teste-customizado',
};

// --- Grupo de Testes: Cartão de Apresentação ---
describe('CartaoDeApresentacao', () => {

  // Teste 1: Garante que os elementos básicos são renderizados em qualquer layout
  test('deve renderizar o título e a descrição corretamente', () => {
    render(<CartaoDeApresentacao {...mockProps} />);
    
    // Verifica se o título está presente
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    
    // Verifica se a descrição está presente
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
    
    // Verifica se a imagem (ícone) está presente e com o texto alternativo correto
    const icon = screen.getByAltText(`Ilustração para ${mockProps.title}`);
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', mockProps.iconUrl);
  });

  // --- Testes para o Layout Padrão (Vertical) ---
  test('deve aplicar as classes corretas para o layout Padrão (Vertical)', () => {
    // Não passando a prop 'layout', assume o padrão (Vertical)
    const { container } = render(<CartaoDeApresentacao {...mockProps} />);
    
    // Verifica a classe de layout principal (flex-col para vertical)
    expect(container.firstChild).toHaveClass('flex-col'); 
    
    // Verifica se a classe customizada foi aplicada
    expect(container.firstChild).toHaveClass(mockProps.className); 
    
    // Não deve ter a classe de reverter a ordem (específica do horizontal)
    expect(container.firstChild).not.toHaveClass('flex-row-reverse');
  });

  // --- Testes para o Layout Horizontal ---
  test('deve aplicar as classes corretas para o layout Horizontal', () => {
    const { container } = render(<CartaoDeApresentacao {...mockProps} layout="horizontal" />);
    
    // Verifica a classe de layout principal (flex-row para horizontal)
    expect(container.firstChild).toHaveClass('flex-row'); 
    
    // Verifica se a classe customizada foi aplicada
    expect(container.firstChild).toHaveClass(mockProps.className);
    
    // Por padrão, 'iconPosition' é 'left', então não deve ter 'flex-row-reverse'
    expect(container.firstChild).not.toHaveClass('flex-row-reverse');
  });

  // --- Teste para Icon Position no Layout Horizontal ---
  test('deve inverter a ordem no layout Horizontal quando iconPosition for "right"', () => {
    const { container } = render(
      <CartaoDeApresentacao 
        {...mockProps} 
        layout="horizontal" 
        iconPosition="right" 
      />
    );
    
    // Verifica se a classe para reverter a ordem foi aplicada
    expect(container.firstChild).toHaveClass('flex-row-reverse'); 
    
    // Não deve ter a classe padrão de linha (mas a de reverter é uma forma de flex-row)
    // O importante é garantir que o 'flex-row-reverse' está lá.
  });
});