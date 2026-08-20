# MATRIZ TÉCNICA X CAMADA - MÓDULO DE NOTIFICAÇÕES

**Laura Nobre, Letícia Bertonzini, Luiza Stecca e Vitoria Ibide**

---

## PARTE 1 - MATRIZ TÉCNICA X CAMADA

| Camada / Grupo de Rotas | Regressão | Segurança | Recuperação | Performance | Estresse | Paralelo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Autenticação (`/auth/*`)** | Alta | Alta | Média | Baixa | Fora do escopo | Fora do escopo |
| **Notificações (`/notificacoes/*`)** | Alta | Média | Alta | Baixa | Fora do escopo | Fora do escopo |
| **Eventos (`/eventos/*`)** | Baixa | Média | Baixa | Baixa | Fora do escopo | Fora do escopo |
| **Participantes (`/participantes/*`)** | Alta | Alta | Média | Baixa | Fora do escopo | Fora do escopo |
| **Inscrições (`/inscricoes/*`)** | Alta | Alta | Alta | Média | Fora do escopo | Fora do escopo |
| **Envio de e-mail (`EmailService` / Nodemailer / MailPit)** | Alta | Média | Alta | Baixa | Fora do escopo | Fora do escopo |
| **Camada de dados (`models` + Sequelize + MariaDB/MySQL)** | Alta | Alta | Média | Baixa | Fora do escopo | Fora do escopo |


### JUSTIFICATIVAS:

**Autenticação (`/auth/*`)**
* **Regressão — ALTA:** Base de controle de acesso de toda a API; falhas nessa etapa afetam o funcionamento de todas as rotas protegidas pelo token.
* **Segurança — ALTA:** Responsável pela emissão de JWT e proteção de senhas. Essa é a barreira crítica contra acessos não autorizados.
* **Estresse — FORA DO ESCOPO:** Não há ferramentas de carga configuradas no ambiente de testes da escola.
* **Paralelo — FORA DO ESCOPO:** Não existe um sistema travado de autenticação operando para comparação cruzada.

**Notificações (`/notificacoes/*`)**
* **Regressão — ALTA:** Funcionalidade que dispara e-mails via Observer (`eventEmitter.js`/`notificacaoObserver.js`). As alterações no código podem quebrar o disparo em silêncio.
* **Recuperação — ALTA:** Se a fila de e-mails ou o serviço falhar, o sistema deve garantir a recuperação do estado sem perder registros no banco.
* **Estresse — FORA DO ESCOPO:** Indisponibilidade de ferramentas especializadas para envio em massa de forma simultânea no ambiente.
* **Paralelo — FORA DO ESCOPO:** Ausência de versão travada do módulo de notificações.

**Eventos (`/eventos/*`)**
* **Estresse — FORA DO ESCOPO:** Ausência de ferramentas para simuladores de acessos simultâneos intensos ao catálogo.
* **Paralelo — FORA DO ESCOPO:** Não existe base ou sistema antigo de eventos para validação paralela.

**Participantes (`/participantes/*`)**
* **Regressão — ALTA:** O cadastro e a atualização do participante impactam diretamente as inscrições e o envio dos e-mails de notificação.
* **Segurança — ALTA:** Deve garantir que as senhas gravadas no banco via Sequelize passem por criptografia e que um participante não acesse dados de outro participante.
* **Estresse — FORA DO ESCOPO:** Sem ferramentas de estresse configuradas na infraestrutura.
* **Paralelo — FORA DO ESCOPO:** Não existe um sistema legado de participantes para comparação.

**Inscrições (`/inscricoes/*`)**
* **Regressão — ALTA:** Mapeada na Parte 5 como nossa rota de maior risco (`POST /inscricoes`). É essencial garantir que alterações do código não afetem a relação entre Inscrição, Evento e Participante.
* **Segurança — ALTA:** Impede que um usuário utilize o token de sessão para inscrever outro participante de forma errada.
* **Recuperação — ALTA:** Parte mais instável por acionar observers. Se a notificação falhar, a transação da inscrição precisa ser preservada ou revertida adequadamente no banco.
* **Estresse — FORA DO ESCOPO:** Falta de ferramentas para testar concorrência de inscrições acima da capacidade.
* **Paralelo — FORA DO ESCOPO:** Não há sistema legado de inscrições para testar saídas em paralelo.

**Envio de e-mail (`EmailService` / Nodemailer / MailPit)**
* **Regressão — ALTA:** Essencial para garantir que alterações no `EmailService.js` não interrompam o envio dos emails.
* **Recuperação — ALTA:** Testar a resistência caso o MailPit caia/fique offline, avaliando se a API lida de forma harmônica sem travar o servidor.
* **Estresse — FORA DO ESCOPO:** Falta de software especializado para testes de estresse de e-mails em massa.
* **Paralelo — FORA DO ESCOPO:** Não há servidor ou serviço legado de e-mails operando em paralelo.

**Camada de dados (`models` + Sequelize + MariaDB/MySQL)**
* **Regressão — ALTA:** Mudanças nos modelos Sequelize/migrations afetam a estrutura do MariaDB/MySQL.
* **Segurança — ALTA:** Garante a proteção contra SQL Injection e verifica se os campos de senha na tabela de Participantes nunca ficam em texto. 
* **Estresse — FORA DO ESCOPO:** Sem ferramentas de estresse de conexões com o banco de dados.
* **Paralelo — FORA DO ESCOPO:** Inexistência de banco antigo para espelhar/comparar consultas.


## PARTE 2 - ESCOPO: O QUE FICA DENTRO E O QUE FICA FORA

### 2.1 Técnicas dentro do escopo
| Técnica | Ferramenta prevista | Em que nível será aplicada |
| :--- | :--- | :--- |
| **Regressão** | Jest + Supertest | Unitário (`parseId.js`, `validators.js`), Integração e Endpoint |
| **Segurança** | Jest + Supertest + bcrypt | Endpoint e Integração (`Participante Model` / MariaDB) |
| **Recuperação** | Docker CLI (para derrubar containers do MySQL/MailPit) + Jest | Integração e Endpoint |
| **Performance** | `responseTime.js` (middleware interno) / Insomnia | Endpoint |

### 2.2 Técnicas fora do escopo
| Técnica descartada | Motivo | Tipo de motivo |
| :--- | :--- | :--- |
| **Estresse** | Sem software de carga configurado no ambiente da escola | Falta de ferramenta |
| **Paralelo** | Não existe versão travada ou sistema anterior rodando em produção | Não se aplica ao sistema |
| **Performance (Rigorosa)** | Não foram declarados requisitos não funcionais nem tempos limites numéricos formais | Falta de requisito |

### 2.3 Riscos aceitos
* **Estresse:** O projeto aceita o risco de degradação severa ou queda não desejada do sistema caso ocorra um pico inesperado de inscrições simultâneas em um mesmo evento.
* **Performance (Rigorosa):** O projeto aceita o risco de rotas (como exportações de relatórios) responderem com tempo elevado sob volume alto de dados por falta de um requisito formal de SLA.


## PARTE 3 - VERIFICAÇÕES DE SEGURANÇA

| # | O que verificar | Nível | Resultado esperado |
| :-: | :--- | :--- | :--- |
| **1** | Acesso a rotas protegidas (ex.: `POST /inscricoes` ou `POST /eventos`) sem o envio do token JWT no cabeçalho `Authorization` | Endpoint | Retorno do código de status HTTP `401 Unauthorized` |
| **2** | Gravação de senha do participante no MariaDB/MySQL durante o cadastro em `POST /participantes` | Integração | O campo de senha na tabela do banco deve conter o hash do `bcrypt` e nunca o texto puro |
| **3** | Tentativa de injeção de SQL em rotas de busca ou parâmetros da API (ex.: `' OR '1'='1`) | Endpoint | A entrada deve ser tratada e sanitizada pelo Sequelize, sendo interpretada estritamente como uma string comum |


## PARTE 4 - REGRESSÃO NO CALENDÁRIO

* **4.1 Momentos de execução:** A suíte automatizada (`npm test`) será executada obrigatoriamente antes de cada `git commit` e no final de cada aula prática de desenvolvimento.
* **4.2 Responsável:** A responsabilidade por verificar a suíte antes do push/entrega será distribuída em rodízio quinzenal entre **Laura Nobre, Letícia Bertonzini, Luiza Stecca e Vitoria Ibide**.
* **4.3 Regra em caso de quebra na véspera:** É proibido remover ou desativar o teste com falha. O grupo congelará o desenvolvimento de novas rotas, identificará o trecho de código modificado que gerou a quebra e corrigirá o problema até que a suíte passe em 100% dos testes antes de autorizar o commit final.


