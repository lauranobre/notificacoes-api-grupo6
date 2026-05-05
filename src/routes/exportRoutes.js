const express = require('express');
const router = express.Router();
// Importei os modelos necessários para as consultas
const { Evento, Participante, Inscricao } = require('../models');
// A biblioteca que eu instalei via npm
const { create } = require('xmlbuilder2');

/**
 * ROTA: Exportar Eventos em XML
 */
router.get('/eventos/xml', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({ order: [['data', 'ASC']] });

        // Inicia a estrutura do XML
        const xml = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('eventos');

        // Percorre cada evento do banco e adiciona ao XML
        eventos.forEach(evento => {
            xml.ele('evento')
                .ele('id').txt(String(evento.id)).up()
                .ele('nome').txt(evento.nome).up()
                .ele('descricao').txt(evento.descricao || '').up()
                .ele('data').txt(evento.data.toISOString()).up()
                .ele('local').txt(evento.local || '').up()
                .ele('capacidade').txt(String(evento.capacidade || 0)).up()
            .up(); // Fecha a tag <evento>
        });

        const xmlString = xml.end({ prettyPrint: true });
        
        // IMPORTANTE: Avisar o navegador/Postman que o conteúdo é XML
        res.set('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (erro) {
        next(erro);
    }
});

/**
 * ROTA: Exportar Eventos em JSON (Download Forçado)
 */
router.get('/eventos/json', async (req, res, next) => {
    try {
        const eventos = await Evento.findAll({ order: [['data', 'ASC']], raw: true });
        
        // Define cabeçalhos para o navegador baixar o arquivo em vez de apenas exibir
        res.set('Content-Type', 'application/json');
        res.set('Content-Disposition', 'attachment; filename="eventos.json"');
        res.json(eventos);
    } catch (erro) {
        next(erro);
    }
});

/**
 * DESAFIO: Exportar Inscrições com Detalhes (Evento e Participante)
 */
router.get('/inscricoes/xml', async (req, res, next) => {
    try {
        // Buscamos as inscrições trazendo os dados relacionados (JOIN)
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
                // Pegamos o nome do evento que veio pelo include
                .ele('evento').txt(insc.evento ? insc.evento.nome : 'N/A').up()
                // Abrimos uma tag aninhada para o participante
                .ele('participante')
                    .ele('nome').txt(insc.participante ? insc.participante.nome : 'N/A').up()
                    .ele('email').txt(insc.participante ? insc.participante.email : 'N/A').up()
                .up() // Fecha <participante>
            .up(); // Fecha <inscricao>
        });

        const xmlString = xml.end({ prettyPrint: true });
        res.set('Content-Type', 'application/xml');
        res.send(xmlString);
    } catch (erro) {
        next(erro);
    }
});

module.exports = router;



//Testar no insominia:
// GET http://localhost:3000/exportar/eventos/xml
//GET http://localhost:3000/exportar/inscricoes/xml
