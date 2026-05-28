# Teste de Integração — Bloco 4

**Data:** [26/05/2026]
**Testador:** [Laura Andrade Nobre]

| # | Teste | Resultado | Observação |
|---|---|---|---|
| 1 | GET /eventos (Seed) | ✅ | Eventos listados |
| 2 | POST /eventos | ✅ | Evento criado |
| 3 | POST /participantes | ✅ | Participante com ID 4 criado |
| 4 | POST /inscricoes | ❌ | Erro de escrita (snake_case) |
| 5 | Verificar e-mail | ✅ | MailPit funcionando |
| 6 | GET /notificacoes | ✅ | Notificação salva como true |
| 7 | Inscrição duplicada | ✅ | Retornou erro 400 |
| 8 | Cancelar inscrição | ✅ | Status atualizado para cancelado |
| 9 | E-mail cancelamento | ✅ | Funcionando |
| 10 | GET /notificacoes/estatisticas | ✅ | Estatísticas corretas |
| 11 | POST /notificacoes/:id/reenviar | ✅ | Reenvio funcionando |
| 12 | GET /exportar/eventos/xml | ✅ | XML gerado |
| 13 | GET /exportar/relatorio/inscricoes | ✅ | Relatório OK |
| 14 | Upload banner | ❌ | Validação de URL |
| 15 | GET /api-docs | ✅ | Swagger OK |
| 16 | Reiniciar servidor | ✅ | Sem erros |
| 17 | Persistência | ✅ | Dados mantidos |

## Problemas encontrados
- `Unknown column 'NaN' in 'where clause'`
- `MulterError: Unexpected field`
- `ValidationError: O banner deve ser uma URL válida`
- `ReferenceError: tipo is not defined`

## Correções feitas

- Corrigido body de `/inscricoes`:

```json
{
  "eventoId": 4,
  "participanteId": 4
}
```

- Corrigido o arquivo `EventoModel.js`:

```javascript
banner: {
    type: DataTypes.STRING,
    allowNull: true,
}
```


| Explicação (POST 4): Foi escrito no body em snake_case, mas no documento estava escrito em pascalCase |

| Explicação (14): Foi removido do arquivo EventoModel.js a validação isUrl do atributo banner |

