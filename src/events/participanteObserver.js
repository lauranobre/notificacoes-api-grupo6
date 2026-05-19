const appEmitter = require('./eventEmitter');
const EmailService = require('../services/EmailService');

appEmitter.on('participante:criado', async (participante) => {

  try {

    console.log(`[OBSERVER] Novo participante criado: ${participante.nome}`);

    const html = `
      <h1>Bem-vindo à Plataforma de Eventos! 🎉</h1>

      <p>Olá <strong>${participante.nome}</strong>,</p>

      <p>Seu cadastro foi realizado com sucesso.</p>

      <p>Agora você já pode participar dos nossos eventos!</p>

      <hr>

      <small>Equipe Plataforma de Eventos</small>
    `;

    const resultado = await EmailService.enviar(
      participante.email,
      'Bem-vindo à Plataforma de Eventos!',
      html
    );

    console.log(`[OBSERVER] E-mail enviado! Preview: ${resultado.previewUrl}`);

  } catch (erro) {

    console.error('[OBSERVER] Erro ao enviar e-mail:', erro.message);

  }

});