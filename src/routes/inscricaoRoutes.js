const express = require("express");
const router = express.Router();
const InscricaoController = require("../controllers/InscricaoController");

// router.post("/", InscricaoController.store);
// router.get("/", InscricaoController.index);
// router.get("/evento/:eventoId", InscricaoController.listarPorEvento);
// router.patch("/:id/cancelar", InscricaoController.cancelar);

/**
 * @swagger
 * components:
 *   schemas:
 *     Inscricao:
 *       type: object
 *       required:
 *         - participanteId
 *         - eventoId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         participanteId:
 *           type: integer
 *           description: ID do participante
 *         eventoId:
 *           type: integer
 *           description: ID do evento
 *         status:
 *           type: string
 *           description: Status da inscrição
 *         dataInscricao:
 *           type: string
 *           description: Data da inscrição
 *       example:
 *         id: 1
 *         participanteId: 2
 *         eventoId: 3
 *         status: "confirmada"
 *         dataInscricao: "2025-08-10"
 */

/**
 * @swagger
 * /inscricoes:
 *   get:
 *     summary: Listar todas as inscrições
 *     tags: [Inscricoes]
 *     responses:
 *       200:
 *         description: Lista de inscrições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inscricao'
 */
router.get("/", InscricaoController.index);

/**
 * @swagger
 * /inscricoes/{id}:
 *   get:
 *     summary: Buscar inscrição por ID (com detalhes)
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da inscrição
 *     responses:
 *       200:
 *         description: Inscrição encontrada
 *       404:
 *         description: Inscrição não encontrada
 */
router.get("/:id", InscricaoController.obterDetalhes);

/**
 * @swagger
 * /inscricoes:
 *   post:
 *     summary: Criar uma nova inscrição
 *     tags: [Inscricoes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - participanteId
 *               - eventoId
 *             properties:
 *               participanteId:
 *                 type: integer
 *               eventoId:
 *                 type: integer
 *           example:
 *             participanteId: 2
 *             eventoId: 3
 *     responses:
 *       201:
 *         description: Inscrição criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", InscricaoController.store);

/**
 * @swagger
 * /inscricoes/evento/{eventoId}:
 *   get:
 *     summary: Listar inscrições de um evento
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: eventoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de inscrições do evento
 */
router.get("/evento/:eventoId", InscricaoController.listarPorEvento);

/**
 * @swagger
 * /inscricoes/{id}/cancelar:
 *   patch:
 *     summary: Cancelar uma inscrição
 *     tags: [Inscricoes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Inscrição cancelada
 *       404:
 *         description: Inscrição não encontrada
 */
router.patch("/:id/cancelar", InscricaoController.cancelar);

module.exports = router;