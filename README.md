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
├── config/ → Configurações de banco, upload e cache
├── controllers/ → Recebe requisições, retorna respostas
├── database/ → Migrations e Seeders (Banco de dados)
├── services/ → Lógica de negócio e validações
├── models/ → Modelos Sequelize (Eventos, Participantes, Inscrições)
├── routes/ → Mapeamento de URLs
├── middlewares/ → Funções intermediárias (log, erros, cache)
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
| `npm run db:migrate` | Executa migrations pendentes |
| `npm run db:migrate:undo` | Desfaz última migration |
| `npm run db:seed` | Insere dados iniciais |
| `npm run db:reset` | Recria banco completo |


## 🗄️ Banco de Dados
- **SGBD:** MySQL
- **ORM:** Sequelize
- **Tabelas:** eventos, participantes, inscricoes, notificacoes
