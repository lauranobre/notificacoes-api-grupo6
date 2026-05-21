const appEmitter = require('./eventEmitter'); // Ajuste o caminho se necessário
const EmailService = require('../services/EmailService');
const { Notificacao, Participante, Evento } = require('../models');

// Função auxiliar para salvar no banco de dados
async function salvarNotificacao(dados) {
    try {
        await Notificacao.create(dados);
        console.log(`[BANCO DE DADOS] Notificação do tipo "${dados.tipo}" salva com sucesso!`);
    } catch (erro) {
        console.error('[ERRO BANCO DE DADOS] Falha ao salvar registro de notificação:', erro.message);
    }
}

// 1. Ouvinte para Inscrição Criada (Confirmação)
appEmitter.on('inscricao:criada', async (inscricao) => {
    try {
        console.log(`[OBSERVER] Nova inscrição detectada: #${inscricao.id}`);

        // Busca os dados completos com os relacionamentos
        const participante = await Participante.findByPk(inscricao.participante_id);
        const evento = await Evento.findByPk(inscricao.evento_id);

        if (!participante || !evento) {
            console.error('[OBSERVER ERRO] Participante ou Evento não encontrados para a inscrição.');
            return;
        }

        const assunto = `Inscrição confirmada: ${evento.nome}`;
        
        // Template HTML do e-mail
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    h2 { color: #2ecc71; }
                    .detalhes { background: #f9f9f9; padding: 15px; border-left: 5px solid #2ecc71; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Inscrição Confirmada! ✅</h2>
                    <p>Olá, <strong>${participante.nome}</strong>!</p>
                    <p>Sua vaga está garantida no evento abaixo:</p>
                    <div class="detalhes">
                        <p><strong>Evento:</strong> ${evento.nome}</p>
                        <p><strong>Código da Inscrição:</strong> #${inscricao.id}</p>
                        <p><strong>Status:</strong> Confirmada</p>
                    </div>
                    <p>Aproveite o evento!</p>
                </div>
            </body>
            </html>
        `;

        // Envia o e-mail real para o MailPit
        await EmailService.enviar(participante.email, assunto, html);
        console.log(`[NOTIFICAÇÃO] E-mail de confirmação enviado para: ${participante.email}`);

        // Salva o histórico no banco de dados com camelCase correto
        await salvarNotificacao({
            inscricao_id: inscricao.id,
            tipo: 'confirmacao',
            destinatarioEmail: participante.email,
            assunto,
            conteudo: html,
            dataEnvio: new Date(),
            enviada: true
        });

    } catch (erro) {
        console.error('[OBSERVER ERRO] Falha no fluxo de inscrição criada:', erro.message);
    }
});

// 2. Ouvinte para Inscrição Cancelada
appEmitter.on('inscricao:cancelada', async (inscricao) => {
    try {
        console.log(`[OBSERVER] Cancelamento detectado para a inscrição: #${inscricao.id}`);

        const participante = await Participante.findByPk(inscricao.participante_id);
        const evento = await Evento.findByPk(inscricao.evento_id);

        if (!participante || !evento) {
            console.error('[OBSERVER ERRO] Participante ou Evento não encontrados para cancelamento.');
            return;
        }

        const assunto = `Inscrição cancelada: ${evento.nome}`;

        // Template HTML do e-mail de cancelamento
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
                    .card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                    h2 { color: #e74c3c; }
                    .detalhes { background: #f9f9f9; padding: 15px; border-left: 5px solid #e74c3c; margin: 15px 0; }
                </style>
            </head>
            <body>
                <div class="card">
                    <h2>Inscrição Cancelada ❌</h2>
                    <p>Olá, <strong>${participante.nome}</strong>.</p>
                    <p>Confirmamos o cancelamento da sua inscrição no evento abaixo:</p>
                    <div class="detalhes">
                        <p><strong>Evento:</strong> ${evento.nome}</p>
                        <p><strong>Código da Inscrição:</strong> #${inscricao.id}</p>
                        <p><strong>Status:</strong> Cancelada</p>
                    </div>
                    <p>Caso tenha sido um engano, você pode realizar uma nova inscrição na nossa plataforma se ainda houverem vagas disponíveis.</p>
                </div>
            </body>
            </html>
        `;

        // Envia o e-mail real para o MailPit
        await EmailService.enviar(participante.email, assunto, html);
        console.log(`[NOTIFICAÇÃO] E-mail de cancelamento enviado para: ${participante.email}`);

        // Salva o histórico no banco de dados com camelCase correto
        await salvarNotificacao({
            inscricao_id: inscricao.id,
            tipo: 'cancelamento',
            destinatarioEmail: participante.email,
            assunto,
            conteudo: html,
            dataEnvio: new Date(),
            enviada: true
        });

    } catch (erro) {
        console.error('[OBSERVER ERRO] Falha no fluxo de inscrição cancelada:', erro.message);
    }
});

module.exports = appEmitter;