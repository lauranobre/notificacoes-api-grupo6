# Auditoria de Qualidade — Sprint 2

**Data:** [14/05/2026]
**Revisores:** 
[Laura-models/config]
[Letícia-controllers/middlewares] 
[Luiza-routes/app.js/server.js/swagger.js]
[Ibide-services/errors/helpers]


## Checklist de Qualidade

### Organização
- [✅] Estrutura de pastas segue o padrão MVC + Services
- [✅] Imports organizados (externos primeiro, internos depois)
- [✅] Nomes de variáveis e funções são claros e consistentes

### Tratamento de Erros
- [✅] Todos os controllers usam try/catch + next(erro)
- [✅] Erros retornam formato padronizado
- [✅] Erros do Sequelize são tratados no errorHandler

### Validações
- [✅] Todas as rotas POST/PUT têm validação
- [✅] E-mails são validados
- [✅] IDs são parseados corretamente

### Documentação
- [ ] Swagger cobre todas as rotas atuais
- [ ] README está atualizado
- [ ] .env.example tem todas as variáveis

### Git
- [✅] Utilizamos live share
- [✅] Mensagens de commit são descritivas 
- [✅] .gitignore está correto

## Dívidas Técnicas Encontradas
| # | Descrição | Arquivo | Prioridade | Responsável |

| 1 | Validação de Data | [EventoModel.js] | Média | [Laura] |
| 2 | Regra de Negócio Ambígua | [EventoModel.js] | Média | [Laura] |
| 3 | Validação de formato no Banner | [EventoModel.js] | Baixa | [Laura] |
| 4 | Redundâcia de Mapeamento de Colunas | [InscricaoModel.js] [NotificacaoModel.js] | Baixa | [Laura] |
| 5 | Limitação de Status da Inscrição | [InscricaoModel.js] | Média | [Laura] |
| 7 | Falta do belongsToMany | [models/index.js] | Alta | [Laura] |
| 8 | Declaração duplicada de rota estática | [app.js] | Média | [Luiza] |
| 9 | Organização de Imports | [app.js] | Baixa | [Luiza] |
| 10 | Ordem de Imports Incorreta | [EventoService.js] | Baixa | [Ibide] |
| 11 | Organização de Imports | [ParticipanteService.js] | Média | [bide] |
| 12 | Swagger incompleto nas rotas POST/PUT/DELETE | [EventoRoutes.js] | Média | [Letícia] |
| 13 | Logger utiliza console.log ao invés de biblioteca especializada | logger.js | Baixa | [Laura] |
| 14 | Middleware de response time utiliza console.log ao invés de logger profissional | responseTime.js | Baixa | [Luiza] |
| 15 | req.url pode ser substituído por req.originalUrl nos middlewares | logger.js / responseTime.js | Baixa | [Luiza] |
| 16 | Middleware notFound possui parâmetro next sem utilização | notFound.js | Baixa | [Ibide] |
| 16 | Resposta do notFound não segue o mesmo padrão do errorHandler | notFound.js | Média | [Letícia] |
| 17 | Estrutura condicional do errorHandler pode utilizar else if | errorHandler.js | Baixa | [Ibide] |
| 19 | Rotas de exportação não possuem documentação Swagger | exportRoutes.js | Média | [Laura] |
| 20 | Exportação CSV pode falhar caso relacionamentos venham nulos | exportRoutes.js | Média | [Ibide] |
| 21 | Comentários de teste devem ser removidos do código | exportRoutes.js | Baixa | [Letícia] |
| 22 | AppError não utiliza Error.captureStackTrace | AppError.js | Baixa | [Ibide] |
| 23 | Middlewares ainda não utilizam biblioteca de logs profissional (Winston/Pino/Morgan) | middlewares | Baixa | [Laura] |
