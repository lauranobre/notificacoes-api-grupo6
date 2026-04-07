// src/controllers/ParticipanteController.js
const ParticipanteService = require("../services/ParticipanteService");
const parseId = require("../helpers/parseId"); // Importando o helper que criamos!

function index(req, res, next) {
    try {
        // Agora chama o Service, e não o Model!
        const participantes = ParticipanteService.listarTodos();
        res.json(participantes);
    } catch (erro) {
        next(erro);
    }  
}

function show(req, res, next) {
    try {
        const id = parseId(req.params.id);
        // O Service já faz a validação de "não encontrado", então o Controller fica limpo
        const participante = ParticipanteService.buscarPorId(id);
        res.json(participante);
    } catch (erro) {
        next(erro);
    }
}

function store(req, res, next) {
    try {
        const novoParticipante = ParticipanteService.criar(req.body);
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}

function update(req, res, next) {
    try {
        const id = parseId(req.params.id);
        const atualizado = ParticipanteService.atualizar(id, req.body);
        res.json(atualizado);
    } catch (erro) {
        next(erro);
    }
}

function destroy(req, res, next) {
    try {
        const id = parseId(req.params.id);
        ParticipanteService.deletar(id);
        res.status(204).send(); 
    } catch (erro) {
        next(erro);
    }
}

module.exports = { index, show, store, update, destroy };