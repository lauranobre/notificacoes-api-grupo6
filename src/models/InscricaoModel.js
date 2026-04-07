const { ValidationError } = require("../errors/AppError");

let inscricoes = [];
let proximoId = 1;

// Criar uma nova inscrição
function criar(eventoId, participanteId) {
    // Verificar duplicata (essa fica no Model porque é regra de dados)
    const jaInscrito = inscricoes.find(
        (i) => i.eventoId === eventoId && i.participanteId === participanteId,
    );
    if (jaInscrito) {
        throw new ValidationError("Participante já inscrito neste evento");
    }

    const novaInscricao = {
        id: proximoId,
        eventoId,
        participanteId,
        dataInscricao: new Date().toISOString(),
        status: "confirmada",
    };

    proximoId++;
    inscricoes.push(novaInscricao);
    return novaInscricao;
}


// Listar inscrições de um evento específico
function listarPorEvento(eventoId) {
    return inscricoes.filter((i) => i.eventoId === eventoId);
}


// Listar todas as inscrições
function listarTodas() {

    return inscricoes;
}


// Cancelar uma inscrição
function cancelar(id) {
    const index = inscricoes.findIndex((i) => i.id === id);
    if (index === -1) return null;
    inscricoes[index].status = "cancelada";
    return inscricoes[index];
}

// PARTE 1 DO DESAFIO
// Buscar uma inscrição por ID
function buscarPorId(id) {
    return inscricoes.find((i) => i.id === id);
}

module.exports = {
    criar,
    listarPorEvento,
    listarTodas,
    cancelar,
    buscarPorId
};