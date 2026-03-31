const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");
const { isRequired, validar } = require("../helpers/validators");
const { ValidationError, NotFoundError, BadRequestError } = require("../errors/AppError");

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const { eventoId, participanteId } = req.body;

        const erros = validar([
            isRequired(eventoId, "eventoId"),
            isRequired(participanteId, "participanteId")
        ])

        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        // Validação básica: se não houver os IDs, lançamos um erro customizado
        if (!eventoId || !participanteId) {
            throw new ValidationError("eventoId e participanteId são obrigatórios");
        }

        const resultado = InscricaoModel.criar(
            parseInt(eventoId),
            parseInt(participanteId),
        );

        // Se o Model retornar um erro, lançamos ele para cair no catch
        if (resultado.erro) {
            throw new ValidationError(resultado.erro);
        }

        res.status(201).json(resultado);
    } catch (erro) {
        // Encaminha qualquer erro (seja de validação ou do Model) para o errorHandler
        next(erro);
    }
}


// GET /inscricoes — listar todas
function index(req, res, next) {
    try {
        const inscricoes = InscricaoModel.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        // Encaminha qualquer erro inesperado para o errorHandler centralizado
        next(erro);
    }
}


// GET /inscricoes/evento/:eventoId
function listarPorEvento(req, res, next) {
    try {
        const eventoId = parseInt(req.params.eventoId);
        const inscricoes = InscricaoModel.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /inscricoes/:id/cancelar
function cancelar(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const resultado = InscricaoModel.cancelar(id);

        if (!resultado) {
            throw new NotFoundError("Inscrição");
        }

        res.json(resultado);
    } catch (erro) {
        next(erro);
    }
}

// DESAFIO: obterDetalhes
function obterDetalhes(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const inscricao = InscricaoModel.buscarPorId(id);

        if (!inscricao) {
            throw new NotFoundError("Inscrição");
        }

        const evento = EventoModel.buscarPorId(inscricao.eventoId);
        const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

        const respostaFormatada = {
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

        res.status(200).json(respostaFormatada);
    } catch (erro) {
        next(erro);
    }
}

module.exports = { store, index, listarPorEvento, cancelar, obterDetalhes };