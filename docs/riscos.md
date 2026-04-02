# Análise de Riscos
| # | Risco | Probabilidade | Impacto | Nível | Ação de Mitigação |
|---|-------|---------------|---------|-------|-------------------|
| 1 | Membro do grupo faltar por muito tempo | Média | Alto | 🟠 | Manter código documentado e rotatividade de tarefas (pair programming) para que ninguém seja detentor único de uma parte do sistema.
| 2 | Conflitos de merge no Git | Alta | Baixo | 🟡 | Fazer git pull sempre antes de iniciar o trabalho e utilizar branches separadas para cada funcionalidade da WBS.
| 3 | MySQL não funcionar na máquina de alguém | Média | Médio | 🟠 | Testar a configuração do ambiente e conexão com o banco logo na primeira semana; se necessário, usar o banco na nuvem.
| 4 | Tempo insuficiente para todas as features | Média | Alto | 🟠 | Priorizar as features essenciais através da classificação MoSCoW e focar no MVP (Mínimo Produto Viável).
| 5 | [Identifiquem mais riscos do grupo de vocês] Validar as configurações do Mailtrap/Ethereal precocemente com um script de teste simples.
| 6 | Falha na integração com Mailtrap/Ethereal | Baixa | Médio | 🟡 | Validar credenciais e transporte do Nodemailer logo no início |
| 7 | Erros de modelagem nas Migrations | Média | Médio | 🟠 | Revisar diagrama de classes antes de rodar comandos do Sequelize |
| 8 | Endpoints retornando status incorretos | Baixa | Alto | 🔴 | Realizar testes rigorosos no Postman e seguir padrão MVC + Services |

