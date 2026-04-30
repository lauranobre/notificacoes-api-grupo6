/**
 * src/controllers/InscricaoController.js
 */
const InscricaoService = require('../services/InscricaoService');

// Criar uma nova inscrição
async function store(req, res, next) {
    try {
        const novaInscricao = await InscricaoService.criar(req.body);
        res.status(201).json(novaInscricao);
    } catch (erro) {
        next(erro);
    }
}

// Listar todas as inscrições
async function index(req, res, next) {
    try {
        const inscricoes = await InscricaoService.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// Listar inscrições filtradas por um evento específico
async function listarPorEvento(req, res, next) {
    try {
        const { eventoId } = req.params;
        const inscricoes = await InscricaoService.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// Cancelar uma inscrição (mudar status para 'cancelada')
async function cancelar(req, res, next) {
    try {
        const { id } = req.params;
        const inscricaoCancelada = await InscricaoService.cancelar(id);
        res.json(inscricaoCancelada);
    } catch (erro) {
        next(erro);
    }
}

async function obterDetalhes(req, res, next) {
    try {
        const { id } = req.params;
        const inscricao = await InscricaoService.buscarPorId(id);
        res.json(inscricao);
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    store,
    index,
    listarPorEvento,
    cancelar,
    obterDetalhes
};