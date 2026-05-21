function notFound(req, res, next) {

    res.status(404).json({
        erro: {
            tipo: 'Not Found',
            mensagem: 'Rota não encontrada',
            statusCode: 404
        },
        metodo: req.method,
        url: req.originalUrl,
    });
}

module.exports = notFound;