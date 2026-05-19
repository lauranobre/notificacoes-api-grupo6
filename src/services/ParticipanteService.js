const { Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const appEmitter = require('../events/eventEmitter');

async function listarTodos() {
  return await Participante.findAll({
    order: [['nome', 'ASC']],
  });
}

async function buscarPorId(id) {
  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  return participante;
}

async function criar(dados) {
  try {

    const novoParticipante = await Participante.create(dados);

    // EMITE O EVENTO
    appEmitter.emit('participante:criado', novoParticipante);

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

  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

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

  const participante = await Participante.findByPk(id);

  if (!participante) {
    throw new NotFoundError('Participante');
  }

  await participante.destroy();

  return true;
}

module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar
};