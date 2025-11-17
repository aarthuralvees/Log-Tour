import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {describe, test, expect } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from './index';

function PaginaFalsaDoChatbot() {
  return <h1>Página do Chatbot</h1>;
}

describe('Home Page', () => {

    test('renderização estática de todos os componentes corretamente', () => {

        render(
        <MemoryRouter>
            <Home />
        </MemoryRouter> 
        );

        // div Hero
        expect(screen.getByRole('heading', {name: /logtour/i, level: 1})).toBeInTheDocument();
        expect(screen.getByRole('img', {name: /símbolo logtour/i})).toBeInTheDocument();

        // textoHero
        expect(screen.getByRole('heading', {name: /um site para o planejamento/i, level: 2})).toBeInTheDocument();
        expect(screen.getByText(/crie roteiros que conciliam/i)).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /começar/i})).toBeInTheDocument();

        // seção de cartões
        expect(screen.getByRole('heading', {name: /um roteiro para cada gosto/i})).toBeInTheDocument();

        // cartão 1
        expect(screen.getByRole('heading', { name: /conheça turi/i })).toBeInTheDocument();
        expect(screen.getByText(/a missão dele é transformar/i)).toBeInTheDocument();

        // cartão 2
        expect(screen.getByRole('heading', { name: /cada um quer/i })).toBeInTheDocument();
        expect(screen.getByText(/converse com o turi/i)).toBeInTheDocument();

        // cartão 3
        expect(screen.getByRole('heading', { name: /medo de imprevistos/i })).toBeInTheDocument();
        expect(screen.getByText(/O turi pensa em tudo/i)).toBeInTheDocument();

        // cartão 4
        expect(screen.getByRole('heading', { name: /falar de dinheiro/i })).toBeInTheDocument();
        expect(screen.getByText(/O turi resolve!/i)).toBeInTheDocument();

        //footer
        expect(screen.getByText(/© logtour 2025/i)).toBeInTheDocument();
    });

    test('funcionamento do botão',  async () => {

        const user = userEvent.setup();

        render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<PaginaFalsaDoChatbot />} />
            </Routes>
        </MemoryRouter>
        );
            
        const botao = screen.getByRole('button', {name: /começar/i});
        await user.click(botao);
        expect(screen.getByRole('heading', {name: /Página do Chatbot/})).toBeInTheDocument();
        expect(screen.queryByRole('heading', {name: /logtour/i, level: 1})).not.toBeInTheDocument();
    });

});

