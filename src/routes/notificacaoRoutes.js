const express = require('express');
const router = express.Router();
const { Notificacao, Inscricao, Evento, Participante } = require('../models');
const EmailService = require('../services/EmailService');

router.get('/', async (req, res, next) => {
  try {
    const notificacoes = await Notificacao.findAll({
      include: [{
        model: Inscricao,
        as: 'inscricao',
        include: [
          { model: Evento, as: 'evento', attributes: ['nome'] },
          { model: Participante, as: 'participante', attributes: ['nome', 'email'] },
        ],
      }],
      order: [['created_at', 'DESC']],
    });

    res.json(notificacoes);

  } catch (erro) {
    next(erro);
  }
});

router.post('/teste-email', async (req, res, next) => {
  try {

    const resultado = await EmailService.enviar(
      'teste@exemplo.com',
      'Teste da API de Notificações',
      '<h1>Funcionou! 🎉</h1><p>Este e-mail foi enviado pela nossa API - Grupo 6 (Laura, Luiza, Letícia, Ibide).</p>'
    );

    res.json({
      mensagem: 'E-mail de teste enviado!',
      visualizarEm: resultado.visualizarEm,
    });

  } catch (erro) {
    next(erro);
  }
});

module.exports = router;