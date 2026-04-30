const { Inscricao, Evento, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function criar(dados) {
  const { eventoId, participanteId } = dados;

  // 1. Verificar se o evento existe (Substitui o EventoModel manual)
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new NotFoundError('Evento');

  // 2. Verificar se o participante existe
  const participante = await Participante.findByPk(participanteId);
  if (!participante) throw new NotFoundError('Participante');

  // 3. Verificar duplicata (Substitui o .some() manual)
  const jaInscrito = await Inscricao.findOne({
    where: { evento_id: eventoId, participante_id: participanteId }
  });

  if (jaInscrito) throw new ValidationError('Participante já inscrito neste evento');

  // 4. Criar a inscrição (O Sequelize já cuida dos campos de data automaticamente)
  const novaInscricao = await Inscricao.create({
    evento_id: eventoId,
    participante_id: participanteId,
  });

  return novaInscricao;
}

async function listarTodas() {
  // O 'include' substitui toda a lógica manual de buscar evento/participante um por um
  return await Inscricao.findAll({
    include: [
      { model: Evento, as: 'evento', attributes: ['id', 'nome', 'data'] },
      { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
    ],
    order: [['created_at', 'DESC']],
  });
}

async function listarPorEvento(eventoId) {
  // Filtra por evento_id e inclui os dados do participante
  return await Inscricao.findAll({
    where: { evento_id: eventoId },
    include: [
      { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] }
    ]
  });
}

async function cancelar(id) {
  const inscricao = await Inscricao.findByPk(id);

  if (!inscricao) {
    throw new NotFoundError('Inscricao');
  }

  // Atualização lógica conforme pedido na aula
  await inscricao.update({ status: 'cancelada' });

  return inscricao;
}

// Obs: A função obterDetalhes não é mais necessária separadamente, 
// pois o listarTodas() e listarPorEvento() já trazem os dados completos via include.

module.exports = { criar, listarTodas, listarPorEvento, cancelar };