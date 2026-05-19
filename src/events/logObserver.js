const fs = require('fs');
const path = require('path');
const appEmitter = require('./emitter');
require('./src/events/logObserver');

const logPath = path.join(__dirname, '../../logs/app.log');

appEmitter.on('inscricao:criada', (inscricao) => {
  const linha = `[${new Date().toISOString()}] INSCRIÇÃO CRIADA: ID #${inscricao.id}\n`;
  
  // Garante que a pasta logs existe antes de escrever
  if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath));
  
  fs.appendFileSync(logPath, linha);
});


appEmitter.on('evento:criado', (evento) => {
  const linha = `[${new Date().toISOString()}] EVENTO CRIADO: "${evento.nome}" (ID: #${evento.id})\n`;
  
  // Garante que a pasta logs existe antes de escrever
  if (!fs.existsSync(path.dirname(logPath))) fs.mkdirSync(path.dirname(logPath));

  fs.appendFileSync(logPath, linha);
});