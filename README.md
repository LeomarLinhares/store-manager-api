# Sobre o projeto

API de gerenciamento de loja em padrão REST feito com Node.js, Express e MySQL. Nele é possível realizar todas as operações CRUD (criação, leitura, atualização e remoção) para manipular dados relacionados a produtos e vendas. A API tem testes e cobertura dos mesmos utilizando Mocha, Chai e Sinon.

## Status do projeto

:hourglass_flowing_sand: Em andamento

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- Mocha
- Chai
- Sinon

## Instruções para inicializar o projeto

### 1. Clone o repositório

- `git clone git@github.com:LeomarLinhares/store-manager-api.git`
- Entre na pasta do repositório que você acabou de clonar:
  - `cd store-manager-api`

### 2. Instale as dependências e inicialize o projeto

- Instale as dependências:
  - `npm install`
- Inicialize o projeto:
  - `npm run debug`

-----------------------

## Como conectar ao banco de dados?

É necessário um arquivo `.env` com as seguintes variáveis de ambiente:

- MYSQL_HOST: por padrão é `localhost`, mas é o host do seu banco de dados.
- MYSQL_USER: o nome de usuário utilizado para se conectar ao banco.
- MYSQL_PASSWORD: a senha utilizada para se conectar ao banco.
- PORT: por padrão é `3000`, mas trata-se da porta onde rodará a aplicação.

## Métodos

### Rotas relacionadas aos produtos:

#### GET

`/products`: Retorna todos os produtos cadastrados.

`/products/:id`: Retorna um único produto onde `:id` deve ser substituído por um id.

#### POST

`/products`: Adiciona um produto ao banco de dados e sua quantidade.

É necessário informar no corpo da requisição a seguinte estrutura:

```
{
  "name": "Nome do produto",
  "quantity": 1
}
```

#### PUT

`/products/:id`: Atualiza um produto cujo id fora informado na rota.

É necessário informar no corpo da requisição a seguinte estrutura:

```
{
  "name": "Nome do produto",
  "quantity": 1
}
```

#### DELETE

`/products/:id`: Remove um produto com o id informado do banco de dados.

### Vendas

#### GET 

`/sales`: Retorna todas as vendas cadastradas.

`/sales/:id`: Retorna uma única venda onde `:id` deve ser substituído por um id.

#### POST

`/sales`: Adiciona uma venda ao banco de dados.

É necessário informar no corpo da requisição a seguinte estrutura:

```
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

Note que trata-se de um Array de itens, logo é possível inserir vários produtos em uma única venda.


#### PUT

`/sales/:id`: Atualiza a venda com o id informado.

É necessário informar no corpo da requisição a seguinte estrutura:

```
[
  {
    "product_id": "product_id",
    "quantity": "product_quantity",
  }
]
```

#### DELETE

`/sales/:id`: Remove a venda com o id informado.

-----------------------

## Roadmap

[ ] - Refatorar salesService.js para refazer a forma que remove o snake case
[ ] - Criar estrutura de pastas mais organizada para melhor aproveitamento em portfólio
[ ] - Cobrir 100% das camadas da aplicação com os testes
