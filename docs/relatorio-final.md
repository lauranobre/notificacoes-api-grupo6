# Relatório Técnico — API de Notificações
**Grupo:** [GRUPO 6 - Números: 14, 16, 18, 23]
**Membros:** [Laura Nobre, Letícia Bertonzini, Luiza Stecca, Marya Vitoria Ibide]
**Data:** [21/05/2026]

---

## 1. Introdução
### 1.1 Objetivo do Projeto
Este projeto consiste em uma API RESTful desenvolvida para gerenciar o módulo de notificações por e-mail de uma plataforma de gerenciamento de eventos. Seu principal objetivo é automatizar o envio de comunicações importantes, como confirmações de inscrição e lembretes de eventos, aos participantes. A necessidade dessa API surge da demanda por uma comunicação eficiente e escalável em sistemas de eventos, garantindo que os usuários recebam informações cruciais de forma oportuna e confiável. A API atua como um componente central para aprimorar a experiência do usuário e a organização de eventos.

### 1.2 Escopo
O projeto abrange a criação e gestão de eventos, participantes e inscrições, além da função de envio de notificações por e-mail. Inclui o CRUD (Create, Read, Update, Delete) para eventos, participantes e inscrições, além disso um banco de dados MySQL. A API também oferece endpoints para exportação de dados em formatos JSON e XML, upload de banners para eventos e documentação pelo Swagger. 
Essa primeira versão do projeto não inclui, por exemplo, autenticação de usuários e uma interface visual própria (Front-End), focando em criar um sistema de notificações no backend que fosse eficiente e confiável.
---

## 2. Tecnologias Utilizadas
| Tecnologia | Versão | Justificativa |
| ---------- | ------ | --------------------------- |
| Node.js | v18+ | Ambiente JavaScript usado no servidor, escolhido pelo suporte a APIs.|
| Express.js | 4.x |Framework simples e flexível para criar APIs e rotas do site.|
| MySQL | 8.0 | Banco de dados usado para armazenar as informações do sistema. |
| Sequelize | 6.37.8 | Ferramenta que ajuda a conectar e manipular o banco de dados usando JavaScript. |
| Nodemailer | 8.0.7 | Biblioteca utilizada para envio de e-mails do sistema. |
| Multer | 2.1.1 | Middleware usado para upload de arquivos, como imagens e banners. |
| Node-Cache | 5.1.2 | Sistema de cache em memória para deixar algumas rotas mais rápidas. |
| Swagger | 6.2.8 / 5.0.1 | Ferramenta usada para documentar e testar os endpoints da API. |
| xmlbuilder2 | 4.0.3 | Biblioteca utilizada para gerar arquivos XML. |
| Dotenv | 17.4.1 | Utilizado para armazenar variáveis de ambiente com mais segurança. |
| Nodemon | 3.1.14 | Reinicia o servidor automaticamente quando o código é alterado. |
| CORS | 2.8.6 | Permite a comunicação entre diferentes origens no sistema. |
---

## 3. Arquitetura do Sistema
### 3.1 Diagrama de Classes
O diagrama de classes UML, ilustra as principais entidades do sistema (Evento, Participante, Inscrição, Notificação) e seus relacionamentos, fornecendo uma visão clara da estrutura de dados e das interações entre os componentes. Este diagrama foi fundamental para a modelagem do banco de dados e a organização do código.
[Diagrama de Classes do Projeto](projeto-aula-1.png)

### 3.2 Arquitetura em Camadas
A API segue uma arquitetura em partes bem definida, promovendo a separação de responsabilidades e facilitando a manutenção. As camadas são organizadas da seguinte forma:
- Cliente (Postman/insomnia): Realiza as requisições HTTP para a API.
- Middlewares: Funções que processam as requisições antes de chegarem aos controladores (ex: express.json, errorHandler.js, logger.js, notFound.js, responseTime.js).
- Routes: Define as rotas da API e mapeia as URLs para os controladores correspondentes.
- Controllers: Recebem as requisições, comanda a lógica de negócio chamando os serviços e montam as respostas HTTP.
- Services: Contêm a lógica de negócio, validações e regras específicas de cada funcionalidade, interagindo com os modelos.
- Models (Sequelize): Representam os elementos do banco de dados e fornecem uma interface para o acesso e manipulação dos dados.
- MySQL: Camada de insistência onde os dados são armazenados. (Essa estrutura garante que cada camada tenha uma responsabilidade única).

### 3.3 Banco de Dados
O banco de dados utiliza MySQL e é gerenciado pelo ORM Sequelize. As principais tabelas são:
- eventos: Armazena informações sobre os eventos.
- participantes: Armazena dados dos participantes.
- inscricoes: Gerencia a relação entre participantes e eventos, registrando as inscrições.
- notificacoes: Registra o histórico de e-mails enviados.
Os relacionamentos principais são:
- Evento 1 → N Inscrição: Um evento pode ter múltiplas inscrições.
- Participante 1 → N Inscrição: Um participante pode ter múltiplas inscrições.
- Inscrição 1 → N Notificação: Uma inscrição pode gerar múltiplas notificações (ex: confirmação, lembrete, cancelamento).
As migrations do Sequelize (src/database/migrations/) definem a estrutura dessas tabelas e seus relacionamentos.

[4 tabelas - Evento, Inscrição, Participante, Notificação]

---

## 4. Funcionalidades Implementadas
| Funcionalidade | Status | Bloco PBE |
| --------------------------------- | ----------- | --------- |
| CRUD de Eventos | ✅ Completo | 1 e 3 |
| CRUD de Participantes | ✅ Completo | 1 e 3 |
| Inscrições | ✅ Completo | 1 e 3 |
| Middlewares e tratamento de erros | ✅ Completo | 2 |
| Validação de dados | ✅ Completo | 2 |
| Persistência MySQL | ✅ Completo | 3 |
| Exportação JSON/XML | ✅ Completo | 3 |
| Upload de arquivos | ✅ Completo | 3 |
| Notificações por e-mail | ✅ Completo | 4 |
| Deploy | ⬜ Não iniciado | 5 |
| Documentação Swagger | ✅ Completo | 5 |

---

## 5. Processo de Desenvolvimento
### 5.1 Metodologia
Desenvolvemos o projeto utilizando uma metodologia ágil, com sprints de duas semanas. Utilizamos o quadro Kanban no GitHub Projects para gerenciar as tarefas, visualizar o fluxo de trabalho e acompanhar o progresso. Essa abordagem nos permitiu flexibilidade, adaptação a mudanças e entregas incrementais ao longo do desenvolvimento.
[Ágil com sprints de 2 semanas, Kanban no GitHub Projects]

### 5.2 Divisão de Trabalho
Organizamos a divisão de trabalho utilizando uma matriz RACI (Responsible, Accountable, Consulted, Informed), conforme detalhado em docs/raci.md. Definimos claramente as responsabilidades de cada membro da nossa equipe para atividades como desenvolvimento de Models/Migrations, Controllers/Routes, Services, Documentação, Testes Postman e Deploy. Essa clareza na atribuição de papéis contribuiu para a nossa eficiência e coordenação. Falta colocar quem fez o que referência à matriz RACI.
 
### 5.3 Controle de Versão
Realizamos o controle de versão utilizando Git e GitHub. O nosso repositório lauranobre/notificacoes-api-grupo6 contém 36 commits, que refletem o histórico do nosso desenvolvimento. Utilizamos a branch main como principal e também usamos o Live Share para colaboração em tempo real, o que impactou a forma como realizávamos e registrávamos os nossos commits individuais. Adotamos a prática de pull constante para mitigar conflitos de merge, conforme mencionamos nos nossos relatórios de sprint.

---

## 6. Desafios e Soluções
| Desafio                             | Como resolvemos |
| --------------------------------- | -----------------------------| 
|Dificuldades nos resultado | O uso recorrente para os testes e validação de rotas ajudou na identificação dos problemas nos endpoints |
| Adaptação e correção de erros | A resolução de problemas foi mais rápida, devido ao uso do LiveShare e a divisão da tarefa em partes menores |
| Conflitos de merge | . | 
| Inconsistência entre diagrama de classes e migrations | Necessidade de revisão extra do diagrama antes de executar os comandos do Sequelize | 
| Refatoração de código duplicado | A refatoração levou à identificação e eliminação de duplicações, melhorando a manutenibilidade do projeto |
| Configuração do banco de dados local | A configuração do .env e a documentação clara do nosso projeto minimizaram os problemas durante o desenvolvimento | 

---
## 7. Lições Aprendidas

Durante o desenvolvimento do projeto, a equipe obteve diversas lições importantes:

- **Validação com Insomnia:** O uso do Insomnia para testar e validar as rotas da API desde o início foi crucial para identificar e corrigir problemas rapidamente.
- **Divisão de Tarefas:** Dividir tarefas complexas em unidades menores e gerenciáveis melhorou significativamente a produtividade e facilitou o acompanhamento do progresso.
- **Documentação Contínua:** Manter a documentação atualizada desde as fases iniciais do projeto evitou retrabalho e serviu como um recurso valioso para todos os membros da equipe.
- **Colaboração Eficaz:** O trabalho colaborativo, especialmente com ferramentas como Live Share, acelerou a resolução de problemas e promoveu a troca de conhecimento entre os membros da equipe.
- **Importância da Arquitetura:** Uma arquitetura bem definida em camadas e a utilização de ORMs como Sequelize contribuíram para um código mais limpo, organizado e fácil de manter.
- **Gerenciamento de Versão:** A prática de commits frequentes e a atenção à integração de código foram essenciais para evitar conflitos e manter a integridade do projeto.

## 8. Próximos Passos

Caso o projeto tivesse continuidade, os próximos passos incluiriam:

- **Autenticação e Autorização:** Implementar um sistema robusto de autenticação (ex.: JWT) e autorização para proteger os endpoints da API e gerenciar o acesso dos usuários.
- **Desenvolvimento de Frontend:** Criar uma interface de usuário (frontend) para interagir com a API, permitindo que os usuários gerenciem eventos e inscrições de forma visual.
- **Notificações Push:** Expandir o sistema de notificações para incluir notificações push, além dos e-mails, proporcionando uma comunicação mais abrangente.
- **Otimização de Performance:** Realizar testes de carga e otimizações adicionais para garantir que a API possa lidar com um grande volume de requisições.
- **Monitoramento e Logs:** Implementar ferramentas de monitoramento e agregação de logs para acompanhar o desempenho da API em produção e identificar proativamente possíveis problemas.
- **Testes Automatizados:** Desenvolver testes unitários e de integração abrangentes para garantir a qualidade e a estabilidade do código.

---

## 9. Referências
- Documentação do Express.js → https://expressjs.com
- Documentação do Sequelize → https://sequelize.org
- Documentação do Nodemaile → https://nodemailer.com
- Documentação do Multer → https://github.com/expressjs/multer
- Documentação do Swagger-jsdoc → https://github.com/Surnet/swagger-jsdoc
- Documentação do Swagger-ui-express → https://github.com/swagger-api/swagger-ui-express
- Repositório GitHub: https://github.com/lauranobre/notificacoes-api-grupo6
