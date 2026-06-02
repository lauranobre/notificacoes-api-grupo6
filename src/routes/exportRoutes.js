const express = require('express');
const router = express.Router();
// Importei os modelos necessários para as consultas
const { Evento, Participante, Inscricao } = require('../models');
// A biblioteca que eu instalei via npm
const { create } = require('xmlbuilder2');

/**
 * @swagger
 * /exportar/eventos/xml:
 *   get:
 *     summary: Exporta todos os eventos em formato XML
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Arquivo XML gerado com sucesso
 *       500:
*         description: Erro ao exportar eventos
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Erro'
 */
router.get('/eventos/xml', async (req, res, next) => { 
    try {
        const eventos = await Evento.findAll({ order: [['data', 'ASC']] });

        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('eventos');

        eventos.forEach(evento => {
            xml.ele('evento')
                .ele('id').txt(String(evento.id)).up()
                .ele('nome').txt(evento.nome).up()
                .ele('descricao').txt(evento.descricao || '').up()
                .ele('data').txt(evento.data.toISOString()).up()
                .ele('local').txt(evento.local || '').up()
                .ele('capacidade').txt(String(evento.capacidade || 0)).up()
            .up(); 
        });

        const xmlString = xml.end({ prettyPrint: true });
        
        res.set('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /exportar/eventos/json:
 *   get:
 *     summary: Exporta todos os eventos em formato JSON
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Arquivo JSON gerado com sucesso
 *       500:
*         description: Erro ao exportar eventos
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Erro'
 */
router.get('/eventos/json', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({ order: [['data', 'ASC']], raw: true });
        
        res.set('Content-Type', 'application/json');
        res.set('Content-Disposition', 'attachment; filename="eventos.json"');
        res.json(eventos);
    } catch (erro) {
        next(erro);
    }
});

router.get('/inscricoes/xml', async (req, res, next) => {
    try {
        const inscricoes = await Inscricao.findAll({
            include: [
                { model: Evento, as: 'evento' },
                { model: Participante, as: 'participante' }
            ]
        });

        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('inscricoes');

        inscricoes.forEach(insc => {
            xml.ele('inscricao')
                .ele('id').txt(String(insc.id)).up()
                .ele('status').txt(insc.status).up()
                .ele('evento').txt(insc.evento ? insc.evento.nome : 'N/A').up()
                .ele('participante')
                    .ele('nome').txt(insc.participante ? insc.participante.nome : 'N/A').up()
                    .ele('email').txt(insc.participante ? insc.participante.email : 'N/A').up()
                .up()
            .up();
        });

        const xmlString = xml.end({ prettyPrint: true });
        res.set('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (erro) {
        next(erro);
    }
});

/**
 * @swagger
 * /exportar/relatorio/inscricoes:
 *   get:
 *     summary: Gera relatório completo de inscrições por evento
 *     tags: [Exportação]
 *     responses:
 *       200:
 *         description: Relatório gerado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       500:
*         description: Erro ao gerar relatório
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Erro'
 */
router.get('/relatorio/inscricoes', async (req, res, next) => {
  try {
    const eventos = await Evento.findAll({
      include: [{
        model: Inscricao,
        as: 'inscricoes',
        include: [{
          model: Participante,
          as: 'participante',
          attributes: ['nome', 'email'],
        }],
      }],
      order: [['data', 'ASC']],
    });

    const relatorio = eventos.map(evento => ({
      evento: evento.nome,
      data: evento.data,
      capacidade: evento.capacidade,
      totalInscritos: evento.inscricoes.length,
      vagasRestantes: (evento.capacidade || 0) - evento.inscricoes.length,
      inscritos: evento.inscricoes.map(i => ({
        nome: i.participante.nome,
        email: i.participante.email,
        status: i.status,
        dataInscricao: i.dataInscricao,
      })),
    }));

    res.json({
      geradoEm: new Date().toISOString(),
      totalEventos: relatorio.length,
      relatorio,
    });

  } catch (erro) {
    next(erro);
  }
});

module.exports = router;