import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import ChatBubble from "./ChatBubble";

afterEach(() => {
  // Garante que o DOM é limpo entre testes
  cleanup();
});

describe("ChatBubble component", () => {

  test("renderiza balões do usuário e da IA", () => {
    // Renderiza dois balões ao mesmo tempo (um usuário e um bot)
    render(
      <>
        <ChatBubble message="Mensagem do Usuário" isUser={true} />
        <ChatBubble message="Mensagem da IA" isUser={false} />
      </>
    );

    // Verifica se os textos apareceram no DOM
    expect(screen.getByText("Mensagem do Usuário")).toBeInTheDocument();
    expect(screen.getByText("Mensagem da IA")).toBeInTheDocument();

    // Verifica se os elementos (balões) existem
    const userBubble = screen.getByText("Mensagem do Usuário").closest("div");
    const botBubble = screen.getByText("Mensagem da IA").closest("div");

    expect(userBubble).toBeInTheDocument();
    expect(botBubble).toBeInTheDocument();
  });

  test("texto aparece dentro do balão e segue a estrutura esperada", () => {
    render(<ChatBubble message="Olá, sou texto" isUser={false} />);

    const textEl = screen.getByText("Olá, sou texto"); // <p>
    const bubble = textEl.closest("div"); // <div> pai

    // O parágrafo existe
    expect(textEl).toBeInTheDocument();

    // O texto está dentro do balão
    expect(bubble).toContainElement(textEl);

    // Estrutura: texto é uma tag <p>
    expect(textEl.tagName).toBe("P");

    // Verifica que o <p> tem a classe de tamanho de texto prevista
    expect(textEl).toHaveClass("text-sm");
  });

  test("aplica classes de estilo corretas para usuário e para a IA", () => {
    // Usuário
    render(<ChatBubble message="Usuário estilo" isUser={true} />);
    const userBubble = screen.getByText("Usuário estilo").closest("div");

    expect(userBubble).toHaveClass("bg-blue-600");
    expect(userBubble).toHaveClass("text-white");
    expect(userBubble).toHaveClass("ml-auto");
    expect(userBubble).toHaveClass("rounded-br-none");

    cleanup(); // limpar antes de renderizar o próximo caso

    // IA / bot
    render(<ChatBubble message="Bot estilo" isUser={false} />);
    const botBubble = screen.getByText("Bot estilo").closest("div");

    expect(botBubble).toHaveClass("bg-gray-100");
    expect(botBubble).toHaveClass("text-gray-800");
    expect(botBubble).toHaveClass("mr-auto");
    expect(botBubble).toHaveClass("rounded-tl-none");
  });

  test("mantém estilos base e limites do site (classes base presentes)", () => {
    render(<ChatBubble message="Teste limites" isUser={false} />);
    const bubble = screen.getByText("Teste limites").closest("div");

    // Verifica classes base que garantem limites e espaçamento
    expect(bubble).toHaveClass("max-w-xl");
    expect(bubble).toHaveClass("p-3");
    expect(bubble).toHaveClass("rounded-xl");
    expect(bubble).toHaveClass("shadow-md");
    expect(bubble).toHaveClass("my-2");
  });

});
