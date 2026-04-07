// 1. Models
const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");

// 2. Erros e Validadores
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

    // parseInt apenas uma vez uma vez para manter o código limpo
    const idEvento = parseInt(eventoId);
    const idParticipante = parseInt(participanteId);

    const evento = EventoModel.buscarPorId(idEvento);
    if (!evento) throw new NotFoundError("Evento");
    
    const participante = ParticipanteModel.buscarPorId(idParticipante);
    if (!participante) throw new NotFoundError("Participante");

    const inscricoesDoEvento = InscricaoModel.listarPorEvento(idEvento);
    const jaInscrito = inscricoesDoEvento.some(inscricao => inscricao.participanteId === idParticipante);
    
    if (jaInscrito) {
        throw new ValidationError("Participante já inscrito neste evento");
    }
    
    return InscricaoModel.criar(idEvento, idParticipante);
}

function listarTodas() {
    return InscricaoModel.listarTodas();
}

function buscarPorId(id) {
    const inscricao = InscricaoModel.buscarPorId(id);
    if (!inscricao) {
        throw new NotFoundError("Inscrição");
    }
    return inscricao;
}

function listarPorEvento(eventoId) {
    return InscricaoModel.listarPorEvento(parseInt(eventoId));
}

function cancelar(id) {
    const cancelado = InscricaoModel.cancelar(id);
    if (!cancelado) {
        throw new NotFoundError("Inscrição");
    }
    return true;
}

// Função trazida do Controller para o Service, respeitando a arquitetura
function obterDetalhes(id) {
    const inscricao = buscarPorId(id); 
    const evento = EventoModel.buscarPorId(inscricao.eventoId);
    const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

    return {
        id: inscricao.id,
        status: inscricao.status,
        dataInscricao: inscricao.dataInscricao,
        evento: evento ? { 
            id: evento.id, 
            nome: evento.nome 
        } : null,
        participante: participante ? { 
            id: participante.id, 
            nome: participante.nome, 
            email: participante.email 
        } : null
    };
}

module.exports = {
    criar,
    listarTodas,
    buscarPorId,
    listarPorEvento,
    cancelar,
    obterDetalhes
};