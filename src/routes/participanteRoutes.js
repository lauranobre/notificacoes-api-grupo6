const express = require("express");
const router = express.Router();

const ParticipanteController = require("../controllers/ParticipanteController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Participante:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *       properties:
 *         id:
 *           type: integer
 *           description: ID gerado automaticamente
 *         nome:
 *           type: string
 *           description: Nome do participante
 *         email:
 *           type: string
 *           description: E-mail do participante
 *       example:
 *         id: 1
 *         nome: Ana Silva
 *         email: ana@email.com
 */

/**
 * @swagger
 * /participantes:
 *   get:
 *     summary: Listar todos os participantes
 *     tags: [Participantes]
 *     responses:
 *       200:
 *         description: Lista de participantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Participante'
 */
router.get("/", ParticipanteController.index);

/**
 * @swagger
 * /participantes/{id}:
 *   get:
 *     summary: Buscar participante por ID
 *     tags: [Participantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     responses:
 *       200:
 *         description: Participante encontrado
 *       404:
 *         description: Participante não encontrado
 */
router.get("/:id", ParticipanteController.show);

/**
 * @swagger
 * /participantes:
 *   post:
 *     summary: Criar um novo participante
 *     tags: [Participantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               nome: Ana Silva
 *               email: ana@email.com
 *     responses:
 *       201:
 *         description: Participante criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: E-mail já cadastrado
 */
router.post(
  "/",
  authMiddleware,
  ParticipanteController.store
);

/**
 * @swagger
 * /participantes/{id}:
 *   put:
 *     summary: Atualizar um participante
 *     tags: [Participantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *             example:
 *               nome: Ana Silva
 *               email: ana@email.com
 *     responses:
 *       200:
 *         description: Participante atualizado
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Participante não encontrado
 *       409:
 *         description: E-mail já cadastrado
 */
router.put(
  "/:id",
  authMiddleware,
  ParticipanteController.update
);

/**
 * @swagger
 * /participantes/{id}:
 *   delete:
 *     summary: Deletar um participante
 *     tags: [Participantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do participante
 *     responses:
 *       204:
 *         description: Participante deletado
 *       404:
 *         description: Participante não encontrado
 *       403:
 *         description: Acesso negado
 */
router.delete(
  "/:id",
  authMiddleware,
  ParticipanteController.destroy
);

module.exports = router;