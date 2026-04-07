# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos

## 📋 Sobre o Projeto

Este projeto faz parte da Situação de Aprendizagem do curso de Programação Back-End do SENAI.
O módulo é responsável por enviar notificações (confirmação de inscrição, lembretes)
para participantes de eventos.

## 🚀 Como Rodar

1. Clone o repositório:
```bash
git clone https://github.com/lauranobre/notificacoes-api.git
```

## ️ Tecnologias
- Node.js
- Express.js
- Swagger (swagger-jsdoc + swagger-ui-express)
- Dotenv (variáveis de ambiente)
- Nodemon (desenvolvimento)
- CORS

## 📁 Estrutura do Projeto
src/
├── controllers/ → Recebe requisições, retorna respostas
├── services/ → Lógica de negócio e validações
├── models/ → Acesso e manipulação de dados
├── routes/ → Mapeamento de URLs
├── middlewares/ → Funções intermediárias (log, erros, CORS)
├── errors/ → Classes de erro customizadas
├── helpers/ → Funções auxiliares (validação, etc.)
├── swagger.js → Configuração da documentação
├── app.js → Configuração do Express
└── server.js → Inicialização do servidor

## 🔧 Scripts
| Comando | Descrição |
|---------|-----------|
| `npm start` | Inicia o servidor (produção) |
| `npm run dev` | Inicia com Nodemon (desenvolvimento) |