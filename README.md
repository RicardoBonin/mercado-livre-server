# Mercado Livre Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

This is the backend server for the Mercado Livre application.

## Installation

1. Clone the repository:

```bash
   git clone git@github.com:RicardoBonin/mercado-livre-server.git
```

2. Navigate to the project directory:

```bash
   cd mercado-livre-server
```

3. Install dependencies:

```bash
yarn install
```

## Usage

To start the server in development mode:

```bash
yarn dev
```

To build the project:

```bash
yarn build
```

To start the server in production mode:

```bash
yarn start
```

## Rotas

1. GET /items

Descrição: Retorna uma lista de itens.

Parâmetros da consulta:

q (opcional): Consulta para buscar itens

### Resposta:

```
{
  "results": {
    "author": {
      "name": "Ricardo",
      "lastname": "Bonin"
    },
    "categories": ["Category 1", "Category 2"],
    "items": [
      {
        "id": "1",
        "title": "Product 1",
        "price": {
          "currency": "USD",
          "amount": 10,
          "decimals": 0
        },
        "picture": "thumbnail_url",
        "condition": "new",
        "free_shipping": true,
        "city": "City"
      },
      {
        "id": "2",
        "title": "Product 2",
        "price": {
          "currency": "USD",
          "amount": 20,
          "decimals": 0
        },
        "picture": "thumbnail_url",
        "condition": "new",
        "free_shipping": true,
        "city": "City"
      }
    ]
  },
  "message": "Success i"
}

```

2. GET /items/:id

Descrição: Retorna um único item com base no ID fornecido.

Parâmetros da URL:

id: ID do item a ser recuperado.

### Resposta:

```
{
  "results": {
    "author": {
      "name": "Ricardo",
      "lastname": "Bonin"
    },
    "categories": ["Category 1", "Category 2"],
    "item": {
      "id": "123",
      "title": "Product 1",
      "price": {
        "currency": "USD",
        "amount": 10,
        "decimals": 0
      },
      "picture": "picture_url",
      "condition": "new",
      "free_shipping": true,
      "sold_quantity": 5,
      "description": "Description of the product"
    }
  },
  "message": "Success"
}
```

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests to us.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Ricardo Bonin ricardo.bonin.rb@gmail.com
