# PLANO DE TESTES — MÓDULO DE NOTIFICAÇÕES
## 1. IDENTIFICAÇÃO

**Sistema:** Plataforma de Eventos  
**Módulo:** Notificações  
**Versão:** 1.0.0  
**Repositório:** github.com/lauranobre/notificacoes-api-grupo6
**Grupo / Integrantes:** Laura Nobre, Letícia Bertonzini, Luiza Stecca e Vitoria Ibide  
**Data de elaboração:** 20/08/2026  
**Última revisão:** --/08/2026  

---

Documento de planejamento e análise de riscos de testes automatizados para o Módulo de Notificações e suas dependências diretas da Plataforma de Eventos.

---

## 2. OBJETIVO E ESCOPO

### 2.1 Objetivo
Garantir a integridade, a segurança e a resiliência das rotas do Módulo de Notificações e serviços acoplados, como autenticação, inscrições e envio de e-mails, através de testes automatizados unitários, de integração e de endpoint.

### 2.2 Dentro do Escopo
| Funcionalidade / Camada | Níveis previstos |
| :--- | :--- |
| Autenticação (`/auth/*`) | Endpoint, Integração |
| Notificações (`/notificacoes/*`) | Unitário, Integração, Endpoint |
| Eventos (`/eventos/*`) | Endpoint |
| Participantes (`/participantes/*`) | Unitário, Integração, Endpoint |
| Inscrições (`/inscricoes/*`) | Unitário, Integração, Endpoint |
| Envio de E-mail (`EmailService` / Nodemailer / MailPit) | Unitário, Integração |
| Camada de Dados (`models` + Sequelize + MariaDB/MySQL) | Integração |

### 2.3 Fora do Escopo
| O que não será testado | Motivo |
| :--- | :--- |
| **Teste de Estresse / Carga** | Ausência de ferramentas especializadas (k6, JMeter) no ambiente escolar. |
| **Teste em Paralelo** | Não existe versão antiga/legada em produção para comparação. |
| **Teste de Aceitação Formal** | Ausência de cliente real para validação formal de regras do negócio. |
| **Interface Gráfica (Frontend)** | O escopo do projeto limita-se estritamente ao desenvolvimento e validação da API REST (backend). |
| **Tempo de resposta rigoroso (SLA)** | Ausência de requisitos não funcionais numéricos formais declarados. |

---

## 3. ITENS A TESTAR

| # | Item a testar | Camada | Arquivo/rota de origem |
| :-: | :--- | :--- | :--- |
| **1** | Processamento e gravação da inscrição (`POST /inscricoes`) | Controller / Model | `src/controllers/InscricaoController.js` |
| **2** | Disparo de eventos de notificação via Observer (`inscricao:criada`) | Event / Observer | `src/events/notificacaoObserver.js` |
| **3** | Envio de e-mail não simultâneo via `EmailService` / Nodemailer | Service / External | `src/services/EmailService.js` |
| **4** | Geração e validação de token JWT no middleware | Middleware / Auth | `src/middlewares/ParticipanteController.js` |
| **5** | Armazenamento seguro de senha do participante com hash `bcrypt` | Model / DB | `src/models/ParticipanteModel.js` |
| **6** | Atualização e controle do status do ENUM de notificação no banco | Model / DB | `src/models/NotificacaoModel.js` |
| **7** | Validação de restrição de exclusividade e vagas no evento | Service / DB | `src/services/InscricaoService.js` |
| **8** | Sanitização de inputs contra SQL Injection via Sequelize | Model / ORM | `src/models/index.js` |
| **9** | Tratamento de falhas de conexão/indisponibilidade do container MailPit | Service / Infra | `src/services/EmailService.js` |
| **10** | Mapeamento e formatação de erros personalizados da API | Errors / Utility | `src/errors/AppError.js` |
| **11** | Proteção de rotas contra acessos sem token JWT (`401 Unauthorized`) | Endpoint / Security | `src/routes/inscricaoRoutes.js` |
| **12** | Listagem paginada de eventos (`GET /eventos`) | Controller / Endpoint | `src/controllers/EventoController.js` |

---

## 4. ANÁLISE DE RISCO

### Tabela Ordenada por Risco Decrescente

| # | Item | P | I | Risco | Grau | Decisão | Justificativa |
| :-: | :--- | :-: | :-: | :-: | :---: | :---: | :--- |
| **1** | Processamento de inscrição e transação (`POST /inscricoes`) | 5 | 4 | **20** | Crítico | Amenizar | Rota de maior complexidade, regras cruzadas e chamadas de observers. |
| **2** | Disparo do Observer (`inscricao:criada`) | 4 | 4 | **16** | Crítico | Amenizar | Falhas na escuta do evento quebram o envio de e-mails em silêncio. |
| **3** | Armazenamento de senha com hash `bcrypt` | 2 | 5 | **10** | Alto | Amenizar | Impacto gravíssimo em segurança/vazamento, embora usabilidade da lib seja madura. |
| **4** | Geração e validação de token JWT | 2 | 5 | **10** | Alto | Amenizar | Regra curta, mas falhas bloqueiam/expõem o acesso a toda a API. |
| **5** | Envio de e-mail via `EmailService` / Nodemailer | 5 | 2 | **10** | Alto | Amenizar | Alta probabilidade por depender de SMTP/MailPit; impacto isolado na comunicação. |
| **6** | Controle de status da notificação no banco (ENUM) | 3 | 3 | **9** | Médio | Amenizar | Risco de incoerência do status (`PENDENTE`, `ENVIADO`, `ERRO`) no ciclo de vida. |
| **7** | Controle de vagas / unicidade na inscrição | 3 | 3 | **9** | Médio | Amenizar | Evita duplicidade de inscrições e overflow de capacidade de eventos. |
| **8** | Tratamento de queda do MailPit | 4 | 2 | **8** | Médio | Amenizar | Garantir que a API continue estável mesmo com falhas no serviço de e-mail. |
| **9** | Sanitização de dados / SQL Injection | 1 | 5 | **5** | Médio | Transferir | Sequelize trata a sanitização nativamente via consultas reguladas. |
| **10** | Bloqueio de rotas sem Token (`401`) | 2 | 2 | **4** | Baixo | Amenizar | Validação simples de middleware de autenticação. |
| **11** | Função utilitária (`parseId.js`) | 1 | 3 | **3** | Baixo | Amenizar | Função pura e isolada sem dependências de rede/banco. |
| **12** | Listagem de eventos (`GET /eventos`) | 1 | 2 | **2** | Baixo | Amenizar | Consulta de leitura simples (`SELECT`) sem autenticação ou side-effects. |

### 4.2 Top 5 Itens de Maior Risco (Foco Inicial)
1. **Item 1:** Processamento e gravação da inscrição (`POST /inscricoes`) — Risco 20
2. **Item 2:** Disparo de eventos via Observer (`inscricao:criada`) — Risco 16
3. **Item 3:** Armazenamento seguro de senha (`bcrypt`) — Risco 10
4. **Item 4:** Geração e validação de token JWT no middleware — Risco 10
5. **Item 5:** Envio de e-mail assíncrono via `EmailService` / Nodemailer — Risco 10

### 4.3 Riscos Aceitos e Consequências Assumidas
* **Teste de Carga/Estresse:** O grupo aceita a consequência de que a API pode sofrer lentidão severa ou indisponibilidade caso haja picos atípicos de requisições simultâneas.
* **Métricas de Performance (SLA):** O grupo aceita o risco de rotas pesadas (como relatórios) levarem alguns segundos para responder sob bases de dados volumosas.

---

## 5. TÉCNICAS E NÍVEIS SELECIONADOS 

| Item/Camada | Nível(is) | Técnica(s) | Justificativa |
| :--- | :--- | :--- | :--- |
| **Inscrições / Observers** | Unitário e Integração | Regressão + Recuperação | Unifica a validação da transação com o disparo resiliente do observer. |
| **Autenticação e Senhas** | Endpoint e Integração | Segurança | Garante a integridade do JWT e valida se as senhas estão criptografadas no DB. |
| **Envio de E-mail** | Integração | Recuperação (Mocks) | Simula cenários de indisponibilidade do MailPit/SMTP sem travar a aplicação. |
| **Utilidades (`parseId`)** | Unitário | Regressão | Teste rápido e direto para garantir previsibilidade de funções puras. |

### 5.1 Alterações de Prioridade
A rota de **Inscrição (`POST /inscricoes`)** passou a ser tratada com a prioridade mais alta da aplicação (Risco 20), pois atua como ponto de convergência entre regra de negócio, persistência de dados e acionamento de eventos assíncronos.

---

## 6. CRITÉRIOS DE ENTRADA E DE SAÍDA

### 6.1 Critérios de Entrada
* [x] Código fonte do módulo atualizado no repositório Git.
* [x] Banco de dados de testes isolado e configurado no ambiente.
* [x] Jest e Supertest instalados com script `npm test` funcional.
* [x] Seeds com dados iniciais de participantes e eventos prontos para execução.
* [x] Plano de testes aprovado pelo grupo e professor.

### 6.2 Critérios de Saída
* [x] **100%** dos 5 casos de risco crítico e alto (itens 1 a 5 da análise) executados e passando.
* [x] **0** defeitos de severidade crítica ou alta em aberto no fechamento do módulo.
* [x] Cobertura mínima de código de **70%** nos arquivos da pasta `services`.
* [x] Relatório final de execução emitido e revisado até 29/10/2026.

---

## 7. AMBIENTE E FERRAMENTAS

| Item | Definição |
| :--- | :--- |
| **Runtime** | Node.js v20.x LTS |
| **Banco de dados de teste** | MariaDB/MySQL (Container isolado via Docker em porta dedicada) |
| **Framework de teste** | Jest |
| **Teste de endpoint** | Supertest |
| **Serviço de e-mail nos testes** | Nodemailer com MailPit (Container Docker) |
| **Variáveis de ambiente específicas** | `.env.test` |
| **Onde a suíte será executada** | Localmente (máquinas dos integrantes) e em ambiente de entrega da escola |

### 7.1 Isolamento do Banco de Dados de Teste
**O banco de testes NÃO será o mesmo do ambiente de desenvolvimento.**  
*Risco evitado:* Utilizar o mesmo banco acarretaria na limpeza acidental de dados de desenvolvimento durante a execução das rotinas de limpadura/reset (`truncate`/`sync`) do Jest, gerando inconsistências nos testes por dados sujos.

---

## 8. CRONOGRAMA

| Etapa | Datas previstas | Responsável | Entrega |
| :--- | :--- | :--- | :--- |
| Configuração do ambiente Jest e `.env.test` | 27/08/2026 | Vitoria Ibide | Script de teste base rodando |
| Testes unitários (`services`, `utils` e `models`) | 03/09/2026 a 17/09/2026 | Luiza Stecca | Cobertura unitária de 70% |
| Banco de teste e testes de integração | 24/09/2026 a 08/10/2026 | Letícia Bertonzini | Suíte de integração com DB e Mocks |
| Testes de endpoint (Supertest) | 15/10/2026 a 22/10/2026 | Laura Nobre | Testes e2e das rotas principais |
| Mocks e ajustes finais de resiliência | 22/10/2026 | Grupo | Validação de exceções e MailPit |
| Relatório final da formativa | 29/10/2026 | Grupo | Documento final consolidado |

*Marco Fixo: A suíte completa deve estar funcional e passando antes de 12/11/2026.*

---

## 9. PAPÉIS E RESPONSABILIDADES

| Integrante | Responsabilidade principal |
| :--- | :--- |
| **Vitoria Ibide** | Gestão do Plano de Testes, configuração da suíte Jest e Mocks. |
| **Laura Nobre** | Automação dos testes de Endpoint (Supertest) e cenários de Segurança. |
| **Letícia Bertonzini** | Testes de Integração da Camada de Dados (Sequelize/MariaDB). |
| **Luiza Stecca** | Testes Unitários de Services, Observers e Utilidades. |

### 9.1 Responsável pela Verificação do Build/Suíte
**Vitoria Ibide** é a responsável individual nomeada para verificar e garantir que a suíte inteira de testes (`npm test`) esteja passando antes de cada commit e entrega final.

---

## 10. RISCOS DO PROJETO DE TESTES

| Risco | Probabilidade | Impacto | Como vamos lidar |
| :--- | :-: | :-: | :--- |
| **Ausência de integrante em datas de execução** | 3 | 4 | Rodízio de responsabilidades e registro dos avanços em branches organizadas no GitHub. |
| **Falta de testabilidade do código existente** | 3 | 4 | Refatorar controllers pesados para isolar a lógica de negócio na camada de *Services*. |
| **Incompatibilidade de variáveis do ambiente local** | 2 | 3 | Padronização das configurações de ambiente através do arquivo `.env.test.example` e Docker. |
| **Cobertura de código abaixo do limite estipulado (70%)** | 3 | 3 | Acompanhar o relatório de cobertura do Jest (`--coverage`) semanalmente. |