const appEmitter = require('./eventEmitter');
const { Notificacao, Participante, Evento, Inscricao } = require('../models');
const EmailService = require('../services/EmailService');

// Observer: escuta o evento 'inscricao:criada'
appEmitter.on('inscricao:criada', async (inscricao) => {

  try {
    console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);
    const inscricaoCompleta = await Inscricao.findByPk(inscricao.id, {
      include: [
        { model: Evento, as: 'evento' },
        { model: Participante, as: 'participante' },
      ],
    });

    if (!inscricaoCompleta) return;
    const { evento, participante } = inscricaoCompleta;
    // Montar HTML do e-mail
    const html = `
      <h2>Inscrição Confirmada! ✅</h2>
      <p>Olá <strong>${participante.nome}</strong>,</p>
      <p>
        Sua inscrição no evento
        <strong>"${evento.nome}"</strong>
        foi confirmada com sucesso.
      </p>
      <p><strong>Detalhes do evento:</strong></p>
      <ul>
        <li>
          <strong>Data:</strong>
          ${new Date(evento.data).toLocaleDateString('pt-BR')}
        </li>
        <li>
          <strong>Local:</strong>
          ${evento.local || 'A definir'}
        </li>
      </ul>
      <p>Até lá! 🎉</p>
      <hr>
      <small>
        Este é um e-mail automático da Plataforma de Eventos.
      </small>
    `;

    // Enviar e-mail
    const resultado = await EmailService.enviar(
      participante.email,
      `Inscrição confirmada: ${evento.nome}`,
      html
    );

    // Criar notificação no banco
    const notificacao = await Notificacao.create({

      inscricao_id: inscricao.id,
      tipo: 'confirmacao',
      destinatarioEmail: participante.email,
      assunto: `Inscrição confirmada: ${evento.nome}`,
      conteudo: html,
      data_envio: new Date(),
      enviada: true,

    });

    console.log(
      `[OBSERVER] E-mail enviado! Preview: ${resultado.previewUrl}`
    );

  } catch (erro) {

    console.error(
      '[OBSERVER] Erro ao enviar notificação:',
      erro.message
    );

  }
});

// Observer: escuta 'inscricao:cancelada'
appEmitter.on('inscricao:cancelada', async (inscricao) => {
  try {
    console.log(`[OBSERVER] Inscrição #${inscricao.id} cancelada`);
  } catch (erro) {
    console.error('[OBSERVER] Erro:', erro.message);
  }
});