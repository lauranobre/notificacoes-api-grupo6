const { Evento } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const { Op } = require('sequelize'); // Importado aqui para usar em todo o arquivo

async function listarTodos(opcoes = {}) {
  const {
    pagina = 1,
    porPagina = 10,
    ordenarPor = 'data',
    ordem = 'ASC',
    busca = null,
  } = opcoes;

  // Construir filtro de busca
  const where = {};
  
  if (busca) {
    where.nome = { [Op.like]: `%${busca}%` };
  }

  // Buscar com paginação
  const { count, rows } = await Evento.findAndCountAll({
    where,
    order: [[ordenarPor, ordem.toUpperCase()]],
    limit: parseInt(porPagina),
    offset: (parseInt(pagina) - 1) * parseInt(porPagina),
  });

  return {
    dados: rows,
    total: count,
    pagina: parseInt(pagina),
    porPagina: parseInt(porPagina),
    totalPaginas: Math.ceil(count / parseInt(porPagina)),
  };
}

/**
 * RESOLUÇÃO DO DESAFIO - PARTE 2
 * Retorna apenas eventos com data posterior a hoje[cite: 1]
 */
async function listarFuturos() {
  const agora = new Date(); // Obtém a data/hora atual[cite: 1]
  
  const eventos = await Evento.findAll({
    where: {
      data: {
        [Op.gt]: agora // Operador "Greater Than" para buscar datas MAIORES que agora[cite: 1]
      }
    },
    order: [['data', 'ASC']], // Ordena do mais próximo para o mais distante[cite: 1]
  });

  return eventos;
}

async function buscarPorId(id) {
  const evento = await Evento.findByPk(id);
  if (!evento) {
    throw new NotFoundError('Evento');
  }
  return evento;
}

async function criar(dados) {
  try {
    const novoEvento = await Evento.create(dados);
    return novoEvento;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

async function atualizar(id, dados) {
  const evento = await Evento.findByPk(id);
  if (!evento) {
    throw new NotFoundError('Evento');
  }

  try {
    await evento.update(dados);
    return evento;
  } catch (erro) {
    if (erro.name === 'SequelizeValidationError') {
      const mensagens = erro.errors.map(e => e.message).join('; ');
      throw new ValidationError(mensagens);
    }
    throw erro;
  }
}

async function deletar(id) {
  const evento = await Evento.findByPk(id);
  if (!evento) {
    throw new NotFoundError('Evento');
  }
  await evento.destroy();
  return true;
}

module.exports = {
  listarTodos,
  listarFuturos, // Não esqueça de exportar a nova função!
  buscarPorId,
  criar,
  atualizar,
  deletar,
};