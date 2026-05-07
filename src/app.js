//Aula 17, parte 3 exportações
const exportRoutes = require('./routes/exportRoutes');

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// ============================================
// MIDDLEWARES GLOBAIS
// ============================================


//Aula 18, PARTE 1
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// ============================================


app.use(express.json());
app.use(cors());

const responseTime = require("./middlewares/responseTime");
app.use(responseTime);

// (Opcional - recomendo)
const logger = require("./middlewares/logger");
app.use(logger);

// ============================================
// DOCUMENTAÇÃO
// ============================================

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ============================================
// ROTAS
// ============================================

const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);

app.use('/exportar', exportRoutes);

// Rota raiz
app.get("/", (req, res) => {
  res.json({
    mensagem: "API de Notificações",
    versao: "1.0.0",
    documentacao: "/api-docs",
    rotas: {
      eventos: "/eventos",
      participantes: "/participantes",
      inscricoes: "/inscricoes",
    },
  });
});

// ============================================
// MIDDLEWARES DE ERRO
// ============================================

const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

app.use('/uploads', express.static('uploads'));
app.use(notFound);
app.use(errorHandler);

module.exports = app;