// src/services/ParticipanteService.js
const { Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function listarTodos() {
  return await Participante.findAll({
    order: [['nome', 'ASC']],
  });
}

async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante'); 
  } // <--- O ERRO ESTAVA AQUI: Faltava fechar essa chave!

  return participante;
}

async function criar(dados) {
  try {
    const novoParticipante = await Participante.create(dados);
    return novoParticipante;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro; 
  }
}

async function atualizar(id, dados) {
  // 1. Busca o participante para garantir que existe
  const participante = await Participante.findByPk(id);
  
  if (!participante) {
    throw new NotFoundError('Participante');
  }

  // 2. Tenta atualizar os dados capturando erros de validação
  try {
    await participante.update(dados);
    return participante;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

async function deletar(id) {
  // 1. Busca o participante
  const participante = await Participante.findByPk(id);
  
  if (!participante) {
    throw new NotFoundError('Participante');
  }

  // 2. Deleta o registro do banco
  await participante.destroy();
  return true;
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };