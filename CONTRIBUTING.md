## Guia de contribuição

1. **Crie uma Branch** a partir da `dev` com seu nome.  
2. **Implemente as alterações** e verifique se tudo funciona localmente.  
3. **Abra um Pull Request (PR)** para a branch `dev` com uma descrição clara das mudanças feitas.  
4. Aguarde a revisão.

## Convenções de Commits

**Mensagens de Commit:**
```
tipo(escopo): descrição
```

**Tipos aceitos:**
- `feat` → nova funcionalidade  
- `fix` → correção de bug  
- `docs` → alterações na documentação  
- `refactor` → melhorias no código sem mudar comportamento  

**Exemplo:**
```
fix(api): corrigir resposta incorreta da API
```

## Checklist antes de submeter o código

- [ ] Código compilando sem erros  
- [ ] Nenhum arquivo desnecessário incluído (ex.: logs, node_modules, etc.)  
- [ ] Seguiu o padrão de commits 
- [ ] Documentação atualizada, se necessário  

##  Configuração do Projeto Localmente

1. **Clonar o repositório**
   ```bash
   cd repositorio
   https://github.com/aarthuralvees/Log-Tour.git
   ```
   
2. **configurar .env na raiz do diretório server com sua chave do gemini**
   ```bash
   GEMINI_API_KEY=<SUA_CHAVE>
   ```

3. **Instalar dependências**
   ```bash
   npm install
   ```

4. **Executar o projeto**

   ```bash
   cd server
   npm run dev
   ```

   ```bash
   cd client
   npm run dev
   ```

