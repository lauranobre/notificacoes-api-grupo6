# ESTUDO DIRIGIDO: ANATOMIA DO MÓDULO DE NOTIFICAÇÕES

**Laura Nobre, Letícia Bertonzini, Luiza Stecca e Vitoria Ibide**

---

# PARTE 1 — INVENTÁRIO DA ARQUITETURA

| Camada | Arquivos encontrados | Responsabilidade |
|---|---|---|
| **Rotas** | `eventoRoutes.js`; `participanteRoutes.js`; `inscricaoRoutes.js`; `notificacaoRoutes.js`; `exportRoutes.js` | Definir os endpoints e encaminhar as requisições para controllers/services ou executar operações específicas. |
| **Controllers** | `Evento Controller.js`; `Inscrição Controller.js`; `Participante Controller.js` | Receber requisições, chamar os services e montar respostas HTTP. |
| **Services** | `Evento Service.js`; `Inscrição Service.js`; `Participante Service.js`; `Notificação Service.js`; `Email Service.js` | Regras de negócio, persistência/orquestração e comunicação com e-mail. |
| **Models** | `Evento Model.js`; `Inscrição Model.js`; `Notificação Model.js`; `Participante Model.js`; `index.js` | Mapear entidades e relacionamentos do banco via Sequelize. |
| **Middlewares** | `cache Middleware.js`; `errorHandler.js`; `logger.js`; `notFound.js`; `responseTime.js` | Cache, logs, tratamento de erros, 404 e medição de tempo. |
| **Configuração** | `database.js`; `cache.js`; `upload.js`; `.env.example` | Configurar banco, cache, upload e parâmetros externos. |
| **Outros** | `helpers`; `errors`; `events`; `templates`; `migrations`; `seeders`; `swagger.js` | Funções auxiliares, erros, eventos, templates, banco e documentação. |

## Respostas

### 1. Quantos arquivos existem em cada camada?

- **Rotas:** 5
- **Controllers:** 3
- **Services:** 5
- **Models:** 5
- **Middlewares:** 5
- **Configuração:** 3 arquivos de configuração + `.env.example`
- **Outros:** `helpers`, `errors`, `events`, `templates`, `migrations`, `seeders` e Swagger.

### 2. As responsabilidades estão separadas?

Parcialmente. Controllers, services e models estão separados nas funcionalidades principais, mas existem rotas que fazem acesso direto aos models ou executam lógica diretamente, especialmente `exportRoutes.js` e a rota de upload de banner.

### 3. Onde está a comunicação com o banco?

Nos models/services por meio do Sequelize. A conexão está em `src/config/database.js` e a configuração dos models em `src/models/index.js`. Algumas rotas também acessam models diretamente.

### 4. Onde está a comunicação com o e-mail?

Em `src/services/EmailService.js`, usando Nodemailer/SMTP. O projeto está preparado para MailPit por meio de `SMTP_HOST` e `SMTP_PORT`.

---

# PARTE 2 — MAPA DAS ROTAS

## EVENTOS

| # | Método | Caminho | Token? | Controller | Service | Model | Efeito colateral |
|---|---|---|---|---|---|---|---|
| 1 | GET | `/eventos` | Não | EventoController | EventoService | Evento | Nenhum (apenas leitura) |
| 2 | POST | `/eventos` | Sim | EventoController | EventoService | Evento | Grava evento no banco |
| 3 | POST | `/eventos/{id}/banner` | Sim | EventoController | EventoService | Evento | Faz upload de arquivo / atualiza registro no banco |
| 4 | GET | `/eventos/{id}` | Não | EventoController | EventoService | Evento | Nenhum (apenas leitura) |
| 5 | PUT | `/eventos/{id}` | Sim | EventoController | EventoService | Evento | Atualiza dados do evento no banco |
| 6 | DELETE | `/eventos/{id}` | Sim | EventoController | EventoService | Evento | Apaga registro do evento no banco |

---

## PARTICIPANTE

| # | Método | Caminho | Token? | Controller | Service | Model | Efeito colateral |
|---|---|---|---|---|---|---|---|
| 1 | GET | `/participantes` | Sim | ParticipanteController | ParticipanteService | Participante | Nenhum (apenas leitura) |
| 2 | POST | `/participantes` | Não | ParticipanteController | ParticipanteService | Participante | Grava participante no banco (cadastro) |
| 3 | GET | `/participantes/{id}` | Sim | ParticipanteController | ParticipanteService | Participante | Nenhum (apenas leitura) |
| 4 | PUT | `/participantes/{id}` | Sim | ParticipanteController | ParticipanteService | Participante | Atualiza dados do participante no banco |
| 5 | DELETE | `/participantes/{id}` | Sim | ParticipanteController | ParticipanteService | Participante | Apaga registro do participante no banco |

---

## NOTIFICAÇÃO

| # | Método | Caminho | Token? | Controller | Service | Model | Efeito colateral |
|---|---|---|---|---|---|---|---|
| 1 | GET | `/notificacoes` | Sim | NotificacaoController | NotificacaoService | Notificacao | Nenhum (apenas leitura) |
| 2 | GET | `/notificacoes/estatisticas` | Sim | NotificacaoController | NotificacaoService | Notificacao | Nenhum (apenas leitura) |
| 3 | GET | `/notificacoes/{id}` | Sim | NotificacaoController | NotificacaoService | Notificacao | Nenhum (apenas leitura) |
| 4 | POST | `/notificacoes/{id}/reenviar` | Sim | NotificacaoController | NotificacaoService / EmailService | Notificacao | Envia e-mail e atualiza status no banco |
| 5 | POST | `/notificacoes/teste-email` | Sim | NotificacaoController | EmailService | Notificacao | Envia e-mail de teste |

---

## INSCRIÇÕES

| # | Método | Caminho | Token? | Controller | Service | Model | Efeito colateral |
|---|---|---|---|---|---|---|---|
| 1 | GET | `/inscricoes` | Sim | InscricaoController | InscricaoService | Inscricao | Nenhum (apenas leitura) |
| 2 | POST | `/inscricoes` | Sim | InscricaoController | InscricaoService | Inscricao | Grava inscrição no banco (pode acionar envio de notificação) |
| 3 | GET | `/inscricoes/evento/{eventoId}` | Sim | InscricaoController | InscricaoService | Inscricao, Evento | Nenhum (apenas leitura) |
| 4 | GET | `/inscricoes/{id}` | Sim | InscricaoController | InscricaoService | Inscricao | Nenhum (apenas leitura) |
| 5 | PATCH | `/inscricoes/{id}/cancelar` | Sim | InscricaoController | InscricaoService | Inscricao | Atualiza status da inscrição no banco para cancelada |

---

## EXPORTAÇÃO

| # | Método | Caminho | Token? | Controller | Service | Model | Efeito colateral |
|---|---|---|---|---|---|---|---|
| 1 | GET | `/exportar/eventos/xml` | Sim | ExportacaoController | ExportacaoService | Evento | Gera arquivo de exportação (XML) |
| 2 | GET | `/exportar/eventos/json` | Sim | ExportacaoController | ExportacaoService | Evento | Gera arquivo de exportação (JSON) |
| 3 | GET | `/exportar/relatorio/inscricoes` | Sim | ExportacaoController | ExportacaoService | Inscricao, Evento | Gera relatório completo de inscrições |

---

# PARTE 3 — QUE NÍVEL DE TESTE CABE ONDE?

**Sim, os seus testes do Insomnia servem perfeitamente como referência!**

O Insomnia faz requisições via HTTP diretamente para a sua API e valida o código de status (`200`, `201`, `401`, `404`), os cabeçalhos (*headers*) e o corpo da resposta em JSON.

Por esse motivo, **todos os testes que você configurou no Insomnia entram na categoria de testes de Endpoint (Sistema).**

Para preencher a tabela completa, você pode usar os exemplos do seu Insomnia para o nível **Endpoint** e complementar com as regras internas do sistema para os níveis **Unitário**, **Integração** e **Aceitação**.

| # | Comportamento a verificar | Nível | Por que este nível |
|---|---|---|---|
| 1 | Impedir que um participante se inscreva duas vezes no mesmo evento (Inscrições / Autenticação) | **Integração** | O banco de dados não permite uma inscrição ser feita mais de uma vez. |
| 2 | Validar que a data de término de um evento não pode ser anterior à data de início (Eventos) | **Unitário** | Roda apenas recebendo o objeto com as duas datas na memória, sem precisar do banco de dados ou fazer chamadas HTTP. |
| 3 | A criação de um participante insere os dados corretamente e criptografa a senha na tabela do banco de dados (Participantes) | **Integração** | A verificação exige confirmar se o dado realmente chegou e foi persistido do jeito correto no banco de dados. |
| 4 | Envio de requisição para `/notificacoes/teste-email` devolve status `200 OK` (Notificações) | **Endpoint** | Envolve a verificação da rota HTTP, confirmando que a API recebe os parâmetros corretos e responde com o código de sucesso esperado. |
| 5 | Um participante realiza o fluxo completo de cadastro e inscrição e o sistema garante que ele recebeu a mensagem final de confirmação de vaga (Participantes / Eventos) | **Aceitação** | Valida a jornada do usuário do início ao fim sob a perspectiva do cliente, garantindo que o requisito de negócio completo foi atendido com sucesso. |

---

# PARTE 4 — ANÁLISE

## 4.1 Se uma única funcionalidade do módulo falhasse silenciosamente em produção, qual causaria o maior estrago? Por quê?

A funcionalidade que causaria o maior estrago seria o **envio automático das notificações após uma inscrição ou cancelamento**.

O sistema tem como objetivo principal enviar e-mails de confirmação e cancelamento. Se essa funcionalidade falhasse sem gerar erro ou log, os participantes poderiam realizar inscrições normalmente, mas não receberiam a confirmação.

Isso poderia causar dúvidas, reclamações e problemas de comunicação com os participantes dos eventos.

Além disso, o sistema utiliza um Observer para disparar as notificações a partir dos eventos de inscrição e cancelamento, aumentando a importância dessa parte do sistema.

O `InscricaoService` emite os eventos:

- `inscricao:criada`
- `inscricao:cancelada`

---

## 4.2 Quais pontos do módulo dependem de algo externo ao código de vocês?

Os principais pontos são:

- **Banco de dados MariaDB/MySQL**, utilizado pelo Sequelize.
- **Servidor SMTP/MailPit**, utilizado para envio e captura dos e-mails.
- **Variáveis de ambiente**, principalmente as configurações de banco e SMTP.
- **Sistema de arquivos**, utilizado no upload dos banners dos eventos.
- **Relógio/data do sistema**, utilizado em funcionalidades relacionadas às datas dos eventos e notificações.
- **Bibliotecas externas**, como Express, Sequelize, Nodemailer, Multer e xmlbuilder2.

O próprio README informa que o projeto depende de Node.js, MySQL/MariaDB e configurações de ambiente.

---

## 4.3 Escolha uma função ou método que seja regra de negócio pura.

Uma função que pode ser utilizada como candidata para teste unitário é:

**`parseId` — arquivo `src/helpers/parseId.js`**

Ela é uma função auxiliar que pode ser executada apenas com os dados fornecidos, sem precisar acessar banco de dados ou rede.
Por isso, é adequada para um teste unitário.
Outro ponto interessante para testes unitários são as funções de validação existentes em `src/helpers/validators.js`.

---

## 4.4 Existe alguma parte do módulo que vocês não sabem explicar o que faz?

A parte que merece maior investigação é o funcionamento completo do **Observer de notificações**, principalmente a comunicação entre:

- `eventEmitter.js`
- `notificacaoObserver.js`
- `participanteObserver.js`

Sabemos que o `InscricaoService` dispara eventos quando uma inscrição é criada ou cancelada, mas para garantir completamente o comportamento seria necessário acompanhar todo o fluxo até o envio do e-mail e o registro da notificação.

Essa parte deve ser melhor mapeada antes dos testes.

---

# PARTE 5 — DESAFIO EXTRA

## Rota de maior risco

**POST `/inscricoes`**

### Probabilidade de conter um defeito: Alta

Essa rota possui várias dependências e regras de negócio.

Ela envolve os models de:

- **Inscrição**
- **Evento**
- **Participante**

Além disso, verifica os dados necessários para realizar uma inscrição.

Após criar a inscrição, também dispara notificações, aumentando a quantidade de etapas envolvidas no processamento.

### Impacto se falhar: Alto

Se essa rota falhar, pode impedir que participantes consigam se inscrever em eventos ou, em um cenário mais grave, permitir inscrições incorretas.
Além disso, uma falha pode fazer com que a inscrição seja registrada, mas a notificação não seja enviada corretamente.
Por isso, o problema pode afetar tanto os dados do sistema quanto a comunicação com os participantes.

---

## Rota de menor risco

**GET `/eventos/:id`**

### Probabilidade de conter um defeito: Baixa

Essa rota possui uma operação simples de consulta de um evento específico.
Ela não altera dados, não cria registros e não dispara notificações.
Portanto, possui menos regras e menos etapas envolvidas do que as rotas de criação, atualização ou cancelamento.

### Impacto se falhar: Baixo

Caso essa rota apresente um erro, o problema ficará limitado à consulta de um evento específico.
Os dados não serão alterados ou excluídos e nenhuma notificação será disparada.
Além disso, outras funcionalidades da API continuarão disponíveis.

---

## Conclusão

A **POST `/inscricoes`** é considerada a rota de maior risco porque apresenta **alta probabilidade de conter defeitos e alto impacto caso falhe**, já que envolve múltiplos models e ainda dispara notificações.

A **GET `/eventos/:id`** é considerada a de menor risco porque possui **baixa complexidade e baixo impacto**, realizando apenas uma consulta sem modificar dados do sistema.