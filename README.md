# Cineline

Cineline é um projeto de site que propõe uma rede social focada em compartilhar opiniões ou reviews sobre filmes, séries e jogos (em desenvolvimento).

## Tecnologias utilizadas

- Backend: Backend: Node.js + Express (API RESTful)
- Banco de dados: PostgreSQL **rodando com docker**
- Frontend: HTML, JavaScript (lógica implementada), CSS em progresso

## Progresso

O servidor em Express já está com as principais rotas implementadas, incluindo requisições e respostas de dados funcionando corretamente. O banco de dados PostgreSQL está conectado ao servidor e totalmente funcional.
O frontend ainda é a parte menos desenvolvida, mas as principais funções lógicas necessárias para testar a página já estão implementadas e operacionais.


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
Descomente dois trechos do código do **server.js**:

```
// pool.query(`
//     CREATE TABLE users (
//     user_id SERIAL PRIMARY KEY,
//     user_name varchar(31),
//     user_username varchar(15),
//     user_password varchar(31),
//     user_mail varchar(31)
//     );
// `)
//     .then(() => console.log("Table user created with successful."))
//     .catch((error) => console.log("Erro L47: ", error));
```

```
// pool.query(`
//     CREATE TABLE reviews (
//         review_id SERIAL PRIMARY KEY,
//         user_id int NOT NULL,
//         review_name varchar(100),
//         review_type varchar(15),
//         review_genre varchar(15),
//         review_content text
//     );
//     `)
//     .then(() => console.log("Table reviews created with successful"))
//     .catch((error) => console.log(error));
```

### 5
Em seguida, rode:

```
node server.js
```

### 6
Comente novamente os dois trechos e rode novamente **node server.js**
