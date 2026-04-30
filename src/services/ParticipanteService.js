// src/services/ParticipanteService.js
const { Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError'); // Importei ValidationError também

async function listarTodos() {
  // Conforme o roteiro: findAll com ordenação por nome
  return await Participante.findAll({
    order: [['nome', 'ASC']],
  });
}

async function buscarPorId(id) {
  // Conforme o roteiro: findByPk
  const participante = await Participante.findByPk(id);

  // Se não encontrar, lança o erro que o professor pediu
  if (!participante) {
    throw new NotFoundError('Participante'); // Passando apenas o nome do recurso como no exemplo dele
  }

  return participante;
}

async function criar(dados) {
  // Conforme o roteiro: try/catch para erros do Sequelize
  try {
    const novoParticipante = await Participante.create(dados);
    return novoParticipante;
  } catch (erro) {
    // Seguindo exatamente o padrão que o professor fez no EventoService:
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    
    // Se for outro erro (como o UniqueConstraint), o errorHandler da Parte 4 resolve
    throw erro; 
  }
}

async function atualizar(id, dados) { /* TODO: próxima aula */ }
async function deletar(id) { /* TODO: próxima aula */ }

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };