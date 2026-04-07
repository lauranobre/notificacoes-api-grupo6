const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const { isRequired, validar } = require("../helpers/validators");

function criar(dados) {
    const { eventoId, participanteId } = dados;
    const erros = validar([
        isRequired(eventoId, "eventoId"),
        isRequired(participanteId, "participanteId"),
    ]);

    if (erros) {
        throw new ValidationError(erros.join("; "));
    }
    const evento = EventoModel.buscarPorId(parseInt(eventoId));
    if (!evento) throw new NotFoundError("Evento");
    const participante = ParticipanteModel.buscarPorId(parseInt(participanteId));
    if (!participante) throw new NotFoundError("Participante");

    // Busca todas as inscrições desse evento
    const inscricoesDoEvento = InscricaoModel.listarPorEvento(parseInt(eventoId));
    // Verifica se já existe alguma com o ID desse participante
    const jaInscrito = inscricoesDoEvento.some(inscricao => inscricao.participanteId === parseInt(participanteId));
    
    if (jaInscrito) {
        // Dispara o erro 400 exigido pelo teste
        throw new ValidationError("Participante já inscrito neste evento");
    }
    return InscricaoModel.criar(parseInt(eventoId), parseInt(participanteId));
}

function listarTodas() {
    return InscricaoModel.listarTodas();
}
function buscarPorId(id) {
    const inscricao = InscricaoModel.buscarPorId(id);
    if (!inscricao) {
        throw new NotFoundError("Inscricao");
    }
    return inscricao;
}

function listarPorEvento(eventoId) {
    const inscricoes = InscricaoModel.listarPorEvento(parseInt(eventoId));
    return inscricoes;
}

function cancelar(id) {
    const cancelado = InscricaoModel.cancelar(id);
    if (!cancelado) {
        throw new NotFoundError("Inscricao");
    }
    return true;
}

module.exports = {
    criar,
    listarTodas,
    buscarPorId,
    listarPorEvento,
    cancelar
};