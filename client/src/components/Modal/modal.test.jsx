import React, { useState }from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '.';
import { describe, test, expect } from 'vitest';

function ModalTester() {
  // simula o useState de uma página real para o teste 3
  const [isOpen, setIsOpen] = useState(true); // inicia aberto

  return (
      <Modal isOpen={isOpen} setOpen={setIsOpen}></Modal>
  );
}

describe('Modal Component', () => {

  test('o modal não deve aparecer', () => {
    
    render(<Modal />); // renderiza o componente

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument(); // o componente não deve estar presente
  });


  test('renderiza o modal', () => {

    render(
    <Modal isOpen={true}>
        <h2>conteúdo children</h2>
    </Modal>
    ); // renderiza o componente quando a prop isOpen == true

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument(); // o componente deve estar presente

    const conteudo = screen.getByRole('heading', {name: /conteúdo children/i})
    expect(conteudo).toBeInTheDocument();
  });

  test('verifica o fechamento do modal', async () => {

    render(<ModalTester />);

    const x = screen.getByText('✕');
    await userEvent.click(x);

    const modal = screen.queryByRole('dialog');
    expect(modal).not.toBeInTheDocument();

  });
})

