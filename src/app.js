const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const cors = require("cors");


const logger = require("./middleware/logger");
const responseTime = require("./middleware/responseTime");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

//DESAFIO
const InscricaoController = require('./controllers/InscricaoController');

// Middlewares globais
app.use(express.json());
app.use(cors());

app.use(logger);
app.use(responseTime);

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//DESAFIO
app.get('/inscricoes/:id/detalhes', InscricaoController.obterDetalhes);

// Importar rotas
const eventoRoutes = require("./routes/eventoRoutes");
const participanteRoutes = require("./routes/participanteRoutes.js");
const inscricaoRoutes = require("./routes/inscricaoRoutes");

app.use("/eventos", eventoRoutes);
app.use("/participantes", participanteRoutes);
app.use("/inscricoes", inscricaoRoutes);


// Rota raiz (informativa)
app.get("/", (req, res) => {
    res.json({
        mensagem: "API de Notificações",
        rotas: {
            eventos: "/eventos",
            participantes: "/participantes",
            inscricoes: "/inscricoes"
        },
    });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;