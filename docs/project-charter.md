# Project Charter — API de Notificações


## 1. Nome do Projeto
API de Notificações por E-mail para Plataforma de Eventos


## 2. Objetivo
Desenvolver uma API REST que gerencie o envio de notificações por e-mail
(confirmação de inscrição e lembretes) para participantes de eventos.


## 3. Justificativa
É necessário para automatizar a comunicação com os participantes, garantindo que eles recebam as confirmações e lembretes, o que reduz a taxa de ausência nos eventos.


## 4. Escopo

### Incluído:
- CRUD de Eventos, Participantes e Inscrições
- Módulo de notificações por e-mail (simulado)
- Documentação com Swagger
- Deploy em plataforma de nuvem

### Não incluído:
- Autenticação de usuários
- Front-end
- Envio de SMS ou push notifications

## 5. Equipe
| Nome | Função/Responsabilidade |
|------|------------------------|
| [Laura] | [Líder técnico, responsável pelo banco] |
| [Leticia] | [Responsável pela documentação] |
| [Luiza] | [Responsável pelos testes] |
| [Marya] | [Responsável pela organização do projeto] |

## 6. Tecnologias
Node.js, Express.js, MySQL, Sequelize, Swagger, Nodemailer, Git/GitHub

## 7. Prazo
Início: 03/03/2026 | Entrega final: 10/06/2026

## 8. Critérios de Sucesso
- [ ] API funcional com todos os CRUDs
- [ ] Dados persistidos em MySQL
- [ ] Notificações por e-mail funcionando (simulado)
- [ ] Documentação Swagger completa
- [ ] Deploy realizado
- [ ] Apresentação aprovada

## Critérios de Qualidade do Projeto
| Aspecto | Critério | Como medir |
|---------|----------|------------|
| **Funcionalidade** | Todos os endpoints responderam corretamente aos testes | Testes no Insomnia |
| **Organização** | Código segue padrão MVC + Services | Code review |
| **Documentação** | Swagger cobre todas as rotas | Acessar /api-docs |
| **Versionamento** | Todos os membros com commits -> Laura, Letícia, Luiza e Marya | Histórico do GitHub ->  |
| **Manutenibilidade** | Nomes claros, código limpo | Checklist de Clean Code |