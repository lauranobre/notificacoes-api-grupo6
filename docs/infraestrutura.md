# Infraestrutura e Dependências

## Ambiente de Desenvolvimento
- **OS:** Windows 10/11
- **Runtime:** Node.js v18+
- **IDE:** VS Code
- **Banco:** MySQL 8.0 (instalado na UC de BD)
- **Versionamento:** Git + GitHub

## Dependências do Projeto (package.json)
| Pacote | Versão | Finalidade |
|--------|--------|------------|
| express | ^5.2.1 | Framework web |
| mysql2 | ^3.x | Driver MySQL |
| sequelize | ^6.x | ORM |
| swagger-jsdoc | ^6.2.8 | Geração de docs |
| swagger-ui-express | ^5.0.1 | UI do Swagger |
| dotenv | ^16.x | Variáveis de ambiente |
| cors | ^2.8.6 | Compartilhamento de recursos |
| multer | ^1.x | Upload de arquivos |
| nodemailer | ^6.x | Envio de e-mail |
| node-cache | ^5.x | Cache em memória |

Observação: apenas 4 pacotes estão com a versão completa, que são os únicos que foram baixados. Já os pacotes que a versão está com x ainda não foram baixados, mas serão baixados até o final do projeto. 

## Dependências de Desenvolvimento
| Pacote | Versão | Finalidade |
|--------|--------|------------|
| nodemon | ^3.x | Reinício automático |
| sequelize-cli | ^6.x | Migrations/Seeds |

## Serviços Externos
- **Mailtrap/Ethereal** — servidor de e-mail simulado (gratuito)
- **Render/Railway** — plataforma de deploy (gratuito)