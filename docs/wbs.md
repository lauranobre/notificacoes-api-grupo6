# WBS — API de Notificações
## 1. Planejamento
- 1.1 Levantamento de requisitos //Definir o que a API deve fazer (funcionalidades) e suas restrições.
- 1.2 Diagrama de classes UML //Desenhar a estrutura das entidades e como elas se relacionam entre si.
- 1.3 Definição de tecnologias //Escolha oficial das ferramentas, como Node.js, Express e MySQL.
- 1.4 Configuração do ambiente //Instalação de softwares, editores e criação do repositório inicial.
## 2. Desenvolvimento — Base
- 2.1 Estrutura MVC do projeto //Organização das pastas em Models, Views (ou recursos) e Controllers.
- 2.2 CRUD de Eventos //Criação das rotas para Criar, Ler, Atualizar e Deletar eventos.
- 2.3 CRUD de Participantes //Gestão dos dados das pessoas que se cadastram no sistema.
- 2.4 Inscrições //Lógica para vincular um participante a um evento específico.
- 2.5 Middlewares e tratamento de erros //Funções que interceptam requisições e tratam falhas de forma padronizada.
- 2.6 Camada de Services //Local onde fica a lógica de negócio, separando-a das rotas (Controllers).
- 2.7 Validações //Verificação se os dados enviados pelo usuário estão corretos e seguros.
## 3. Desenvolvimento — Persistência
- 3.1 Configuração do MySQL //Preparação da conexão entre a aplicação e o banco de dados.
- 3.2 Models Sequelize //Definição das tabelas e tipos de dados usando o ORM Sequelize.
- 3.3 Migrations e Seeds //Scripts para criar as tabelas e popular o banco com dados iniciais de teste.
- 3.4 Migração do CRUD para banco //Alterar os CRUDs para que salvem as informações no MySQL, não mais na memória.
- 3.5 Upload de arquivos //Implementação para permitir o envio e salvamento de anexos ou imagens.
- 3.6 Exportação JSON/XML //Funcionalidade para baixar os dados do sistema nestes formatos específicos.
- 3.7 Cache //Armazenamento temporário de dados para tornar a API mais rápida.
## 4. Desenvolvimento — Notificações
- 4.1 Configuração do Nodemailer //Configuração da biblioteca responsável pelo envio técnico dos e-mails.
- 4.2 Templates de e-mail //Criação do visual e texto dos e-mails (corpo da mensagem).
- 4.3 Envio de confirmação //Disparo automático de e-mail assim que alguém se inscreve em um evento.
- 4.4 Envio de lembretes //Mensagens enviadas em datas próximas ao evento para avisar o participante.
- 4.5 Histórico de notificações //Registro de todos os e-mails que já foram enviados pelo sistema.
## 5. Finalização
- 5.1 Documentação Swagger completa //Interface visual para que outros desenvolvedores testem e entendam a API.
- 5.2 Testes finais //Verificação geral para garantir que nada está quebrado antes da entrega.
- 5.3 Deploy //Publicação da API na internet (ex: Render ou Railway) para acesso público.
- 5.4 README e documentação //Escrita do guia de uso e instalação no arquivo principal do GitHub.
- 5.5 Apresentação //Preparação do material para mostrar o projeto funcionando à banca/professor.