import React from "react";

function ChatBubble({ message, isUser}) {
    
    // 1. Estilo base aplicado a todos os balões de chat
    const baseStyles = "max-w-xl p-3 rounded-xl shadow-md my-2";

    // 2. Estilos específicos para o usuário e para o bot
    const conditionalStyles = isUser
        ? "bg-blue-600 text-white ml-auto rounded-br-none" // Estilo para o usuário
        : "bg-gray-100 text-gray-800 mr-auto rounded-tl-none"; // Estilo para a IA
        
    // 3. Combinação dos estilos base e condicionais
    const bubbleClasses = `${baseStyles} ${conditionalStyles}`;


    return (
        // container - estilização
        <div className={bubbleClasses}>
            {/* conteúdo da mensagem */}
            <p className="text-sm">{message}</p>
        </div>
    );
}

export default ChatBubble;

/*

    Explicação dos estilos:
        
        1. Estilo base: Define o tamanho máximo, padding, bordas arredondadas, sombra e margem vertical para todos os balões de chat.

        2. Estilos condicionais: Dependendo se a mensagem é do usuário ou do bot, aplicamos cores de fundo e texto diferentes, além de ajustar o alinhamento (à direita para o usuário e à esquerda para o bot).


        3. Combinação dos estilos: Usamos template literals para combinar os estilos base com os condicionais, resultando em uma classe final que é aplicada ao contêiner do balão de chat.

*/

/*

    a. p-3: padding (preenchimento) em todos os lados usando a escala 3 - varia de 1 a 96.
    
    b. my-2: margem vertical (topo e base) usando a escala 2 (se quiser balões mais próximos diminui a margem, senão, aumenta).
    
    c. max-w-xl: largura máxima (extra grande: 'xl'), mas se quiser diminuir a largura, usar 'lg' ou 'md'.
    
    d.  ml-auto: margem esquerda automática para empurrar o balão para a direita (usuário).

    e. rounded-xl: cantos arredondados extra grandes (mais suave: lg).

    f. shadow-md: sombra de intensidade média (se quiser mais sombra, usar 'shadow-lg' ou 'shadow-xl'), mais sutil: sm.

    g. bg-blue-600: cor de fundo azul (para mudar a cor, trocar o nome - em inglês - a tonalidade varia de 100 a 900).

    h. rounded-br-none: borda arredondada, faz com que o balão do usuário tenha o canto inferior direito quadrado.

    i. text-white: cor do texto (isUser).

    j. text-gray-800: cor do texto (bot).

*/