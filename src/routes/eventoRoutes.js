const express = require("express");
const router = express.Router();
const EventoController = require("../controllers/EventoController");
const upload = require("../config/upload");

/**
 * @swagger
 * components:
 *   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - nome
 *         - data
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome do evento
 *         descricao:
 *           type: string
 *           description: Descrição do evento
 *         data:
 *           type: string
 *           description: Data do evento
 *         local:
 *           type: string
 *           description: Local do evento
 *         capacidade:
 *           type: integer
 *           description: Capacidade máxima
 *       example:
 *         id: 1
 *         nome: Workshop de Node.js
 *         descricao: Aprenda Node.js do zero
 *         data: "2025-08-15"
 *         local: SENAI - Sala 3
 *         capacidade: 30
 */

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Listar todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dados:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Evento'
 *                 total:
 *                   type: integer
 *                 pagina:
 *                   type: integer
 *                 porPagina:
 *                   type: integer
 *                 totalPaginas:
 *                   type: integer
 */
router.get("/", EventoController.index);

router.get("/futuros", EventoController.listarFuturos);

router.post('/:id/banner', upload.single('banner'), async (req, res, next) => {
  try {
    const { Evento } = require('../models');
    const evento = await Evento.findByPk(req.params.id);

    if (!evento) {
      return res.status(404).json({ erro: 'Evento não encontrado' });
    }

    if (!req.file) {
      return res.status(400).json({ erro: 'Nenhum arquivo enviado' });
    }

    await evento.update({ banner: `/uploads/${req.file.filename}` });

    res.json({
      mensagem: 'Banner atualizado com sucesso',
      banner: `/uploads/${req.file.filename}`,
    });
  } catch (erro) {
    next(erro);
  }
});

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Buscar evento por ID
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento não encontrado
 */
router.get("/:id", EventoController.show);

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Criar um novo evento
 *     tags: [Eventos]
 */
router.post("/", EventoController.store);

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Atualizar um evento
 *     tags: [Eventos]
 */
router.put("/:id", EventoController.update);

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Deletar um evento
 *     tags: [Eventos]
 */
router.delete("/:id", EventoController.destroy);

module.exports = router;