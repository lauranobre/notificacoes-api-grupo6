// src/templates/email/lembreteEvento.js

const baseTemplate = require('./baseTemplate');

function lembreteEvento(dados) {
  const { participanteNome, eventoNome, eventoData, eventoLocal } = dados;

  // Calcular quantos dias faltam
  const hoje = new Date();
  const dataEvento = new Date(eventoData);
  const diffMs = dataEvento - hoje;
  const diasFaltando = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  // Criando uma mensagem dinâmica baseada nos dias restantes
  let textoDias = '';
  if (diasFaltando === 0) {
    textoDias = 'É hoje! O grande dia chegou.';
  } else if (diasFaltando === 1) {
    textoDias = 'Falta apenas <strong>1 dia</strong> para o evento!';
  } else {
    textoDias = `Faltam apenas <strong>${diasFaltando} dias</strong> para o evento!`;
  }

  const conteudo = `
    <h2>Lembrete: Evento se aproxima! ⏰</h2>
    <p>Olá <strong>${participanteNome}</strong>,</p>
    
    <p>Estamos passando para lembrar que o evento <strong>${eventoName}</strong> está chegando. ${textoDias}</p>
    
    <p><strong>Detalhes do Evento:</strong></p>
    <ul>
      <li><strong>Data:</strong> ${new Date(eventoData).toLocaleDateString('pt-BR')}</li>
      <li><strong>Local:</strong> ${eventoLocal}</li>
    </ul>
    
    <p>Prepare-se e garanta que está tudo certo para a sua participação. Nos vemos lá!</p>
  `;

  return baseTemplate(conteudo);
}

module.exports = lembreteEvento;