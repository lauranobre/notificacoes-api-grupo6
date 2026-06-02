const express = require('express');
const router = express.Router();

const NotificacaoService = require('../services/NotificacaoService');
const EmailService = require('../services/EmailService');

/**
 * @swagger
 * components:
 *   schemas:
 *     Notificacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         tipo:
 *           type: string
 *           enum: [confirmacao, lembrete]
 *         destinatarioEmail:
 *           type: string
 *         assunto:
 *           type: string
 *         enviada:
 *           type: boolean
 *         dataEnvio:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /notificacoes:
 *   get:
 *     summary: Listar notificações
 *     tags: [Notificações]
 *     parameters:
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *           enum: [confirmacao, lembrete]
 *       - in: query
 *         name: enviada
 *         schema:
 *           type: string
 *           enum: [true, false]
 *     responses:
 *       200:
 *         description: Lista de notificações
 */
router.get('/', async (req, res, next) => {
  try {
    const notificacoes = await NotificacaoService.listarTodas({
      tipo: req.query.tipo,
      enviada: req.query.enviada,
    });

    res.json(notificacoes);

  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /notificacoes/estatisticas:
 *   get:
 *     summary: Estatísticas de envio
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: Contagens de notificações
 */
router.get('/estatisticas', async (req, res, next) => {
  try {
    const stats = await NotificacaoService.obterEstatisticas();

    res.json(stats);

  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /notificacoes/{id}:
 *   get:
 *     summary: Buscar notificação por ID
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificação encontrada
 *       404:
 *         description: Notificação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get('/:id', async (req, res, next) => {
  try {
    const notificacao = await NotificacaoService.buscarPorId(
      parseInt(req.params.id)
    );

    res.json(notificacao);

  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /notificacoes/{id}/reenviar:
 *   post:
 *     summary: Reenviar uma notificação
 *     tags: [Notificações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Notificação reenviada
 *       404:
 *         description: Notificação não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post('/:id/reenviar', async (req, res, next) => {
  try {
    const resultado = await NotificacaoService.reenviar(
      parseInt(req.params.id)
    );

    res.json({
      mensagem: 'Notificação reenviada com sucesso',
      visualizarEm: resultado.visualizarEm,
    });

  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /notificacoes/teste-email:
 *   post:
 *     summary: Enviar e-mail de teste
 *     tags: [Notificações]
 *     responses:
 *       200:
 *         description: E-mail enviado com sucesso
 */
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