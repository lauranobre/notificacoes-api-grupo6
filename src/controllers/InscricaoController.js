// src/controllers/InscricaoController.js
const InscricaoService = require("../services/InscricaoService");
const parseId = require("../helpers/parseId"); //HELPER -> Aula 11

function index(req, res, next) {
    try {
        const inscricoes = InscricaoService.listarTodas();
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

function store(req, res, next) {
    try {
        const novaInscricao = InscricaoService.criar(req.body);
        res.status(201).json(novaInscricao);
    } catch (erro) {
        next(erro);
    }
}

function listarPorEvento(req, res, next) {
    try {
        const eventoId = parseId(req.params.eventoId);
        const inscricoes = InscricaoService.listarPorEvento(eventoId);
        res.json(inscricoes);
    } catch (erro) {
        next(erro);
    }
}

function cancelar(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const resultado = InscricaoService.cancelar(id);
        res.json(resultado);
    } catch (erro) {
        next(erro);
    }
}

function obterDetalhes(req, res, next) {
    try {
        const id = parseId(req.params.id);
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

