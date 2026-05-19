const { Inscricao, Evento, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');
const appEmitter = require('../events/eventEmitter');

async function criar(dados) {

  console.log("DADOS RECEBIDOS:", dados);

  const { eventoId, participanteId } = dados;

  console.log("TIPO:", typeof eventoId);
  console.log("VALOR:", eventoId);

  console.log("eventoId:", eventoId);
  console.log("participanteId:", participanteId);

  const evento = await Evento.findByPk(Number(eventoId));

  console.log("EVENTO ENCONTRADO:", evento);

  if (!evento) throw new NotFoundError('Evento');

  const participante = await Participante.findByPk(participanteId);
  if (!participante) throw new NotFoundError('Participante');

  const jaInscrito = await Inscricao.findOne({
    where: { evento_id: eventoId, participante_id: participanteId }
  });

  if (jaInscrito) {
    throw new ValidationError('Participante já inscrito neste evento');
  }

  if (evento.capacidade !== null) {
    const vagasOcupadas = await Inscricao.count({
      where: { 
        evento_id: eventoId,
        status: 'confirmada'
      }
    });

    if (vagasOcupadas >= evento.capacidade) {
      throw new ValidationError('Capacidade máxima do evento já foi atingida');
    }
  }

  const novaInscricao = await Inscricao.create({
    evento_id: eventoId,
    participante_id: participanteId,
    status: 'confirmada' 
  });

  appEmitter.emit('inscricao:criada', novaInscricao);

  return novaInscricao;
}

async function listarTodas() {
  return await Inscricao.findAll({
    include: [
      { model: Evento, as: 'evento', attributes: ['id', 'nome', 'data'] },
      { model: Participante, as: 'participante', attributes: ['id', 'nome', 'email'] },
    ],
    order: [['created_at', 'DESC']],
  });
}

async function listarPorEvento(eventoId) {
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

  await inscricao.update({ status: 'cancelada' });

  appEmitter.emit('inscricao:cancelada', inscricao);

  return inscricao; // 🔥 (faltava retornar algo aqui)
}

module.exports = {
  criar,
  listarTodas,
  listarPorEvento,
  cancelar
};