const ParticipanteService = require('../services/ParticipanteService');
// const { update } = require('./EventoController');

async function index(req, res, next) {
  try {
    const participantes = await ParticipanteService.listarTodos();
    res.json(participantes);
  } catch (erro) {
    next(erro);
  }
}

async function show(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const participante = await ParticipanteService.buscarPorId(id);
    res.json(participante);
  } catch (erro) {
    next(erro);
  }
}

async function store(req, res, next) {
  try {
    const novo = await ParticipanteService.criar(req.body);
    res.status(201).json(novo);
  } catch (erro) {
    next(erro);
  }
}

async function update(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const atualizado = await ParticipanteService.atualizar(id, req.body);
    res.json(atualizado);
  } catch (erro) {
    next(erro);
  }
}

async function destroy(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    await ParticipanteService.deletar(id);
    res.status(204).send();
  } catch (erro) {
    next(erro);
  }
}

module.exports = { index, show, store, update, destroy };