
//código limpo e refatorado
require("dotenv").config();

const app = require("./app");

const { PORT = 3000, NODE_ENV = "development" } = process.env;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${NODE_ENV}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});
