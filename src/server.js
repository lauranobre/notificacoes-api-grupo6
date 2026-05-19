// // src/server.js
// require("dotenv").config();

// const app = require("./app");
// const { sequelize } = require("./models");

// const PORT = process.env.PORT || 3000;

// async function iniciar() {
//   try {
//     await sequelize.authenticate();
//     console.log("Conexão com MySQL estabelecida com sucesso!");

//     // REMOVIDO: await sequelize.sync({ alter: true });
//     // Agora usamos Migrations para gerenciar o esquema do banco

//     app.listen(PORT, () => {
//       console.log(`Servidor rodando em http://localhost:${PORT}`);
//     });
//   } catch (erro) {
//     console.error("Erro ao iniciar:", erro.message);
//     process.exit(1);
//   }
// }

// iniciar();

// src/server.js
require("dotenv").config();

const app = require("./app");
const { sequelize } = require("./models");
// 1. IMPORTAÇÃO DO SERVIÇO DE E-MAIL
const EmailService = require('./services/EmailService');

require('./events/notificacaoObserver');
require('./events/participanteObserver');


const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso!");
    console.log("BANCO:", sequelize.config.database);

    // 2. INICIALIZAR O SERVIÇO DE E-MAIL
    // Isso cria a conta de teste no Ethereal antes do servidor subir
    await EmailService.inicializar(); 

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      // Opcional: log da documentação que estava no código da aula
      console.log(`Documentação: http://localhost:${PORT}/api-docs`);
    });
  } catch (erro) {
    console.error("Erro ao iniciar:", erro.message);
    process.exit(1);
  }
}

iniciar();