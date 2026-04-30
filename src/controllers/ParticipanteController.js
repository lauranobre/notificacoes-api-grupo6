// const ParticipanteService = require('../services/ParticipanteService');

// async function listar(req, res, next) {
//   try {
//     // Espera o service buscar todos os participantes.
//     const participantes = await ParticipanteService.listarTodos();
//     res.json(participantes);
//   } catch (error) {
//     // Se algo der errado, o next(error) avisa o Express para usar o seu errorHandler.
//     next(error);
//   }
// }

// async function buscar(req, res, next) {
//   try {
//     const { id } = req.params;
//     // Espera o service buscar o participante específico pelo ID.
//     const participante = await ParticipanteService.buscarPorId(id);
//     res.json(participante);
//   } catch (error) {
//     next(error);
//   }
// }

// async function criar(req, res, next) {
//   try {
//     // Envia os dados do corpo da requisição (req.body) para o service criar no banco.
//     const novoParticipante = await ParticipanteService.criar(req.body);
//     // Retorna status 201 (Created) quando o registro é feito com sucesso.
//     res.status(201).json(novoParticipante);
//   } catch (error) {
//     next(error);
//   }
// }

// module.exports = { listar, buscar, criar };

// src/controllers/ParticipanteController.js
const ParticipanteService = require('../services/ParticipanteService');

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

module.exports = { index, show, store };