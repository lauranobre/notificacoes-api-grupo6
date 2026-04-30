function errorHandler(err, req, res, next) {

    let statusCode = err.statusCode || 500;
    let mensagem = err.message || "Erro interno do servidor";
    let tipo = err.name || "Error";

    // 2. Erros de Validacao: Ocorre quando os dados nao passam nas regras do Model (ex: campo vazio).
    if (err.name === 'SequelizeValidationError') {
        statusCode = 400; // Bad Request: O cliente enviou dados invalidos.
        tipo = 'ValidationError';
        // O Sequelize manda um array de erros; o .map extrai apenas as mensagens e o .join as junta.
        mensagem = err.errors.map(e => e.message).join('; ');
    }

    // 3. Erros de Unicidade: Ocorre quando um campo unico (ex: e-mail) ja existe no banco.
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409; // Conflict: O dado enviado conflita com o que ja existe.
        tipo = 'ConflictError';
        mensagem = 'Registro duplicado: ' + err.errors.map(e => e.message).join('; ');
    }

    // 4. Erros de Chave Estrangeira: Ocorre quando tentamos referenciar um ID que nao existe.
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        tipo = 'ForeignKeyError';
        mensagem = 'Referencia invalida: o registro relacionado nao existe';
    }

    // 5. Exibe o erro no terminal para ajudar o desenvolvedor a debugar.
    console.error(`[ERRO] ${tipo}: ${mensagem}`);

    // 6. Montamos o objeto de resposta que o Front-end ou o Postman vai receber.
    const resposta = {
        erro: {
            tipo,
            mensagem,
            statusCode
        }
    };

    // 7. Se estivermos em ambiente de desenvolvimento, adicionamos o 'stack' (rastro do erro).
    if (process.env.NODE_ENV === "development") {
        resposta.erro.stack = err.stack;
    }

    // 8. Envia a resposta final para o cliente.
    res.status(statusCode).json(resposta);
}

module.exports = errorHandler;