## Deploy da Aplicação

link: https://log-tour.vercel.app/

Este projeto foi dividido em **client (frontend)** e **server (backend)**, cada um com seu deploy separado.

⚠️⚠️ Como foi utilizado o free tier do serviço de deploy do backend, quando o site não é utilizado por um tempo ele fica "dormente" e a primeira requisição demora aproximadamente um minuto para ser respondida.

---

## Frontend (Client) – Vercel

O frontend, localizado na pasta `client`, foi deployado utilizando a **Vercel**.

### Passos gerais:
1. O repositório foi conectado à Vercel.
2. Foi selecionada a pasta `client` como raiz do projeto.
3. A Vercel detectou automaticamente um projeto Node/Frontend.
4. O deploy é feito automaticamente a cada push na branch main.

A Vercel cuida do build e da hospedagem da aplicação frontend.

---

## Backend (Server) – Render

O backend, localizado na pasta `server`, foi deployado utilizando o **Render**.

### Passos gerais:
1. O repositório foi conectado ao Render.
2. Foi criado um serviço do tipo **Web Service**.
3. A pasta `server` foi definida como diretório raiz.
4. O comando de build e start foi configurado conforme o projeto  `npm install` e `npm start`.
5. A cada push para a main é necessário dar redeploy no Render manualmente.

---

## Banco de Dados

O banco de dados foi configurado utilizando **Prisma ORM** e está hospedado no **Supabase**.

- O Prisma é responsável pelo mapeamento das tabelas e acesso ao banco.
- A conexão com o banco é feita através de uma URL fornecida pelo Supabase.
- Existem apenas duas tabelas, Usuários e Viagens.

---

## Variáveis de Ambiente

As seguintes variáveis de ambiente foram configuradas na plataforma de deploy do backend (Render):

```env
GEMINI_API_KEY -> Chave da llm que gera os roteiros
DATABASE_URL -> Chave que faz a conexão com o Supabase através do prisma
DB_JWT_SECRET -> Chave para validação e geração de jwts para autenticação
```

⚠️ Essas variáveis não devem ser versionadas no repositório e devem ser configuradas diretamente nas plataformas de deploy.

