function errorHandler(err, req, res, next) {

    let statusCode = err.statusCode || 500;
    let mensagem = err.message || "Erro interno do servidor";
    let tipo = err.name || "Error";

    if (err.name === 'SequelizeValidationError') {
        statusCode = 400; 
        tipo = 'ValidationError';
        mensagem = err.errors.map(e => e.message).join('; ');
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409; 
        tipo = 'ConflictError';
        mensagem = 'Registro duplicado: ' + err.errors.map(e => e.message).join('; ');
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 400;
        tipo = 'ForeignKeyError';
        mensagem = 'Referencia invalida: o registro relacionado nao existe';
    }

    console.error(`[ERRO] ${tipo}: ${mensagem}`);

    const resposta = {
        erro: {
            tipo,
            mensagem,
            statusCode
        }
    };

    if (process.env.NODE_ENV === "development") {
        resposta.erro.stack = err.stack;
    }

    res.status(statusCode).json(resposta);
}

module.exports = errorHandler;