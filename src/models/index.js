// src/models/index.js
const sequelize = require("../config/database"); //importa a instancia da conexão com o banco de dados
const Evento = require("./EventoModel"); //
const Participante = require("./ParticipanteModel");
const Inscricao = require("./InscricaoModel");
const Notificacao = require("./NotificacaoModel");
//essas ultimas 4 linhas importam os modelos (classe que representa as tabelas no banco)

// ── Relacionamentos ──

// Um Evento tem muitas Inscrições 
Evento.hasMany(Inscricao, { foreignKey: "evento_id", as: "inscricoes" }); // cria o evento_id na tabela de inscrições
Inscricao.belongsTo(Evento, { foreignKey: "evento_id", as: "evento" });

// Um Participante tem muitas Inscrições
Participante.hasMany(Inscricao, {
    foreignKey: "participante_id",
    as: "inscricoes", // apelido para as consultas -> evento.getInscricoes()
});
Inscricao.belongsTo(Participante, {
    foreignKey: "participante_id",
    as: "participante",
});

// Uma Inscrição tem muitas Notificações
Inscricao.hasMany(Notificacao, {
    foreignKey: "inscricao_id",
    as: "notificacoes",
});
Notificacao.belongsTo(Inscricao, {
    foreignKey: "inscricao_id",
    as: "inscricao", //apelido para consulta
});

//Exportações
module.exports = {
    sequelize,
    Evento,
    Participante,
    Inscricao,
    Notificacao,
};
