const { Inscricao, Evento, Participante } = require('../models');
const { NotFoundError, ValidationError } = require('../errors/AppError');

async function criar(dados) {
  const { eventoId, participanteId } = dados;

  // 1. Verifica se o evento existe
  const evento = await Evento.findByPk(eventoId);
  if (!evento) throw new NotFoundError('Evento');

  // 2. Verifica se o participante existe
  const participante = await Participante.findByPk(participanteId);
  if (!participante) throw new NotFoundError('Participante');

  // 3. Verifica duplicidade de inscrição
  const jaInscrito = await Inscricao.findOne({
    where: { evento_id: eventoId, participante_id: participanteId }
  });

  if (jaInscrito) throw new ValidationError('Participante já inscrito neste evento');

  // 4. VERIFICAÇÃO DE CAPACIDADE (Correção da Dívida Técnica #15)
  // O evento pode ter capacidade nula (infinita). Se não for nula, checamos o limite.
  if (evento.capacidade !== null) {
    const vagasOcupadas = await Inscricao.count({
      where: { 
        evento_id: eventoId,
        status: 'confirmada' // Conta apenas quem não cancelou
      }
    });

    if (vagasOcupadas >= evento.capacidade) {
      throw new ValidationError('Capacidade máxima do evento já foi atingida');
    }
  }

  // 5. Cria a inscrição
  const novaInscricao = await Inscricao.create({
    evento_id: eventoId,
    participante_id: participanteId,
  });

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

  // Atualiza o status em vez de deletar do banco
  await inscricao.update({ status: 'cancelada' });

  return inscricao;
}

module.exports = { criar, listarTodas, listarPorEvento, cancelar };