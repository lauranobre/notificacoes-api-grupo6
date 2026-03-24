// src/app.js
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const logger = require("./middleware/logger");


//DESAFIO
const InscricaoController = require('./controllers/InscricaoController');

// Middleware para ler JSON no body das requisições
app.use(express.json());

// Documentação Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//DESAFIO
app.get('/inscricoes/:id/detalhes', InscricaoController.obterDetalhes);

// Logger
app.use(logger);

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


module.exports = app;