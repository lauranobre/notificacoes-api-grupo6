# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos

![Node.js](https://img.shields.io/badge/Node.js-24+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MariaDB](https://img.shields.io/badge/MariaDB-11.x-blue)
![Deploy](https://img.shields.io/badge/Deploy-Servidor%20SENAI-blueviolet)

**🌐 URL de Produção:** [10.137.146.206]
**📚 Documentação:** [localhost:3000]/api-docs

---

## 📋 Sobre o Projeto

Sistema de notificações por e-mail para uma plataforma de eventos.
Quando um participante se inscreve em um evento, recebe automaticamente
um e-mail de confirmação. O sistema também envia notificações de cancelamento.

**Desenvolvido como projeto da SA2** — SENAI "Santo Paschoal Crepaldi"
Curso: Técnico em Desenvolvimento de Sistemas
UCs: Programação Back-End + Projetos de Software

### Equipe

- [Laura] — [GitHub](https://github.com/lauranobre)
- [Letícia] — [GitHub](https://github.com/LeBertonzini)
- [Luiza] — [GitHub](https://github.com/luizastecca)
- [Ibide] — [GitHub](https://github.com/Viibide08)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 24+
- MySQL 8.0 ou MariaDB 11+
- Git

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/USUARIO/notificacoes-api-grupoX.git
   cd notificacoes-api-grupoX
   ```
````

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure o ambiente:

   ```bash
   cp .env.example .env
   # Edite o .env com suas credenciais do banco de dados
   ```

4. Crie o banco e execute as migrations:

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Inicie o servidor:

   ```bash
   npm run dev
   ```

6. Acesse:
   - API: http://localhost:3000
   - Swagger: http://localhost:3000/api-docs

---

## 📚 Rotas da API

### Eventos

[tabela com rotas]

### Participantes

[tabela com rotas]

### Inscrições

[tabela com rotas]

### Notificações

[tabela com rotas]

### Exportação

[tabela com rotas]

---

## 🛠️ Tecnologias

| Tecnologia           | Finalidade                     |
| -------------------- | ------------------------------ |
| Node.js              | Runtime                        |
| Express.js           | Framework web                  |
| MariaDB              | Banco de dados                 |
| Sequelize            | ORM                            |
| Nodemailer + MailPit | Envio de e-mails (teste local) |
| Swagger              | Documentação                   |
| Multer               | Upload de arquivos             |

---


## ️ Tecnologias

* Node.js
* Express.js
* Swagger (swagger-jsdoc + swagger-ui-express)
* Dotenv (variáveis de ambiente)
* Nodemon (desenvolvimento)
* CORS
* Nodemailer
* MailPit
* Sequelize
* MySQL

## 📁 Estrutura do Projeto

```bash
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
```

## 🔧 Scripts

| Comando                   | Descrição                            |
| ------------------------- | ------------------------------------ |
| `npm start`               | Inicia o servidor (produção)         |
| `npm run dev`             | Inicia com Nodemon (desenvolvimento) |
| `npm run db:migrate`      | Executa migrations pendentes         |
| `npm run db:migrate:undo` | Desfaz última migration              |
| `npm run db:seed`         | Insere dados iniciais                |
| `npm run db:reset`        | Recria banco completo                |

## 🗄️ Banco de Dados

* **SGBD:** MySQL
* **ORM:** Sequelize
* **Tabelas:** eventos, participantes, inscricoes, notificacoes

---

# 🔔 Notificações

| Método | Rota                         | Descrição                                    |
| ------ | ---------------------------- | -------------------------------------------- |
| GET    | `/notificacoes`              | Listar notificações (filtros: tipo, enviada) |
| GET    | `/notificacoes/estatisticas` | Dashboard de envios                          |
| GET    | `/notificacoes/:id`          | Detalhes da notificação                      |
| POST   | `/notificacoes/:id/reenviar` | Reenviar notificação                         |
| POST   | `/notificacoes/teste-email`  | Enviar e-mail de teste                       |

---

# 📤 Exportação

| Método | Rota                             | Descrição                  |
| ------ | -------------------------------- | -------------------------- |
| GET    | `/exportar/eventos/xml`          | Eventos em XML             |
| GET    | `/exportar/eventos/json`         | Eventos em JSON (download) |
| GET    | `/exportar/relatorio/inscricoes` | Relatório de inscrições    |

---

# 📧 Sistema de Notificações

A API envia e-mails automaticamente utilizando o **Padrão Observer**.

## Funcionalidades

* Confirmação de inscrição enviada automaticamente
* Cancelamento de inscrição enviado automaticamente
* Histórico de notificações salvo no banco
* Estatísticas de envio
* Reenvio manual de notificações
* Templates profissionais de e-mail

Durante o desenvolvimento, os e-mails são capturados pelo **MailPit** (servidor SMTP local).

Visualize os e-mails em:

```bash
http://MAILPIT_IP:8025
