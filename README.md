# Cineline

Projeto de plataforma Full Stack para reviews de filmes, séries e jogos, com autenticação segura via JWT. Construída utilizando Node.js, Express, PostgreSQL, Docker e bcrypt.

## Tecnologias utilizadas

- Backend: Backend: Node.js + Express, JWT e Bcrypt
- Banco de dados: PostgreSQL **rodando com docker**
- Frontend: HTML, JavaScript (lógica implementada), CSS em progresso

## Progresso

O backend foi desenvolvido em Node.js com Express, incluindo autenticação completa com JWT, middleware de proteção de rotas, cadastro e login de usuários, além de operações CRUD para reviews. O projeto possui integração funcional com PostgreSQL rodando em Docker, com todas as principais rotas (públicas e protegidas) operando corretamente. No frontend, apesar de ainda básico, já estão implementadas as funções essenciais como login, consumo da API com envio de token JWT, listagem de reviews e navegação entre as páginas, permitindo testar todo o fluxo de autenticação e exibição de conteúdo.


## Como rodar o projeto pelo Codespaces

### 1
Primeiramente, crie um clone do repositório, clique em "Code" e inicie um Codespace.

###  2
Aperte **Ctrl + Shift + P** e digite **Rebuild Container**. 
Após seu Codespace reiniciar, digite **whoami** e o terminal deve retornar **node** (nome do container).

### 3
Será necessário criar o arquivo .env na pasta raiz para configurar as variáveis de ambiente. Seguindo as variáveis já criadas na composição do Docker, fica assim:

```
DB_PORT=5432
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
```

### 4
Em seguida, rode:

```
node server.js
```
