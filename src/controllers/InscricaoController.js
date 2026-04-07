const InscricaoService = require("../services/InscricaoService");

// GET /inscricoes — listar todas
function index(req, res, next) {
    try {
        const inscricoes = InscricaoService.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// POST /inscricoes — criar uma inscrição
function store(req, res, next) {
    try {
        const novaInscricao = InscricaoService.criar(req.body);
        res.status(201).json(novaInscricao);
    } catch (erro) {
        next(erro);
    }
}

// GET /inscricoes/evento/:eventoId
function listarPorEvento(req, res, next) {
    try {
        const eventoId = parseInt(req.params.eventoId);
        const inscricoes = InscricaoService.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

// PATCH /inscricoes/:id/cancelar
function cancelar(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const resultado = InscricaoService.cancelar(id);
        res.json(resultado);
    } catch (erro) {
        next(erro);
    }
}

// GET /inscricoes/:id/detalhes (DESAFIO: obterDetalhes)
function obterDetalhes(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const detalhes = InscricaoService.obterDetalhes(id); 
        
        res.status(200).json(detalhes);
    } catch (erro) {
        next(erro);
    }
}

module.exports = { 
    index, 
    store, 
    listarPorEvento, 
    cancelar, 
    obterDetalhes 
};

