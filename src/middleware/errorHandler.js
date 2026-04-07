function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const mensagem = err.message || "Erro interno do servidor";

    console.error(`[ERRO] ${err.name}: ${mensagem}`);

    // Montamos o objeto base de erro
    const resposta = {
        erro: {
            tipo: err.name || "Error",
            mensagem: mensagem,
            statusCode: statusCode,
        },
    };

    // Adiciona o rastro do erro (stack) apenas em ambiente de desenvolvimento
    if (process.env.NODE_ENV === "development") {
        resposta.erro.stack = err.stack;
    }
    
    // Retorna a resposta final apenas uma vez
    res.status(statusCode).json(resposta);
}

module.exports = errorHandler;