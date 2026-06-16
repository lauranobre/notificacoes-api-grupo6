# 🔔 Notificações API

API REST para o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos.

![Node.js](https://img.shields.io/badge/Node.js-24+-green)
![Express](https://img.shields.io/badge/Express-4.x-blue)
![MariaDB](https://img.shields.io/badge/MariaDB-11.x-blue)
![Deploy](https://img.shields.io/badge/Deploy-Servidor%20SENAI-blueviolet)

**🌐 URL de Produção:** [10.137.146.206]
**📚 Documentação:** [http://10.137.146.206:3000/api-docs](http://10.137.146.206:3000/api-docs)

---

## 📋 Sobre o Projeto

Sistema de notificações por e-mail para uma plataforma de eventos. Quando um participante se inscreve em um evento, recebe automaticamente um e-mail de confirmação. O sistema também gerencia cancelamentos e envia as notificações correspondentes.

**Desenvolvido como projeto da SA2** — SENAI "Santo Paschoal Crepaldi"
**Curso:** Técnico em Desenvolvimento de Sistemas
**UCs:** Programação Back-End + Projetos de Software

### 👥 Equipe

- **Laura** — [GitHub](https://github.com/lauranobre)
- **Letícia** — [GitHub](https://github.com/LeBertonzini)
- **Luiza** — [GitHub](https://github.com/luizastecca)
- **Ibide** — [GitHub](https://github.com/Viibide08)

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 24+
- MySQL 8.0 ou MariaDB 11+
- Git

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/lauranobre/notificacoes-api-grupo6.git
    cd notificacoes-api-grupo6
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure o ambiente:**
    ```bash
    cp .env.example .env
    # Edite o arquivo .env com suas credenciais do banco de dados
    ```

4.  **Crie o banco e execute as migrations:**
    ```bash
    npm run db:migrate
    npm run db:seed
    ```

5.  **Inicie o servidor:**
    ```bash
    npm run dev
    ```

6.  **Acesse:**
    - API: [http://localhost:3000](http://localhost:3000)
    - Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 📚 Rotas da API

### 📅 Eventos
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/eventos` | Listar todos os eventos (Cache 30s) |
| GET | `/eventos/futuros` | Listar eventos que ainda não ocorreram |
| GET | `/eventos/:id` | Detalhes de um evento específico |
| POST | `/eventos` | Criar novo evento |
| POST | `/eventos/:id/banner` | Upload de banner para o evento |
| PUT | `/eventos/:id` | Atualizar dados do evento |
| DELETE | `/eventos/:id` | Remover evento |

### 👥 Participantes
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/participantes` | Listar todos os participantes |
| GET | `/participantes/:id` | Detalhes do participante |
| POST | `/participantes` | Cadastrar novo participante |
| PUT | `/participantes/:id` | Atualizar dados do participante |
| DELETE | `/participantes/:id` | Remover participante |

### 📝 Inscrições
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/inscricoes` | Listar todas as inscrições |
| GET | `/inscricoes/evento/:eventoId` | Listar inscritos por evento |
| GET | `/inscricoes/:id` | Detalhes de uma inscrição |
| POST | `/inscricoes` | Realizar nova inscrição |
| PATCH | `/inscricoes/:id/cancelar` | Cancelar uma inscrição |

### 🔔 Notificações
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/notificacoes` | Listar histórico de notificações |
| GET | `/notificacoes/estatisticas` | Dashboard de envios e métricas |
| GET | `/notificacoes/:id` | Detalhes de uma notificação |
| POST | `/notificacoes/:id/reenviar` | Reenviar notificação específica |
| POST | `/notificacoes/teste-email` | Enviar e-mail de teste |

### 📤 Exportação
| Método | Rota | Descrição |
| :--- | :--- | :--- |
| GET | `/exportar/eventos/xml` | Exportar eventos em formato XML |
| GET | `/exportar/eventos/json` | Download de eventos em JSON |
| GET | `/exportar/relatorio/inscricoes` | Relatório completo de inscrições |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade |
| :--- | :--- |
| **Node.js** | Runtime JavaScript |
| **Express.js** | Framework web para a API |
| **MariaDB / MySQL** | Banco de dados relacional |
| **Sequelize** | ORM para manipulação do banco |
| **Nodemailer** | Serviço de envio de e-mails |
| **MailPit** | Captura de e-mails em ambiente de dev |
| **Swagger** | Documentação interativa da API |
| **Multer** | Middleware para upload de arquivos |

---

## 📁 Estrutura do Projeto

```bash
src/
├── config/        # Configurações de banco, upload e cache
├── controllers/   # Lógica de controle das rotas
├── database/      # Migrations e Seeders
├── events/        # Implementação do Padrão Observer
├── services/      # Lógica de negócio (E-mail, etc.)
├── models/        # Modelos Sequelize
├── routes/        # Definição dos endpoints
├── middlewares/   # Filtros e interceptadores (Log, Erros)
├── templates/     # Templates de e-mail (HTML)
├── app.js         # Configuração do Express
└── server.js      # Inicialização do servidor
```

---

## 📧 Sistema de Notificações

A API utiliza o **Padrão Observer** para disparar e-mails automaticamente em eventos chave do sistema:

- ✅ **Confirmação de Inscrição:** Enviada assim que o registro é concluído.
- ❌ **Cancelamento de Inscrição:** Notificação de confirmação do cancelamento.
- 📊 **Estatísticas:** Monitoramento em tempo real dos envios realizados.

Em ambiente de desenvolvimento, os e-mails podem ser visualizados através do **MailPit**:
`http://localhost:8025`

---

## 📄 Licença

Projeto Acadêmico — **SENAI 2026**
