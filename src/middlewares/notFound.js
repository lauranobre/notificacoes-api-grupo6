function notFound(req, res, next) {

    res.status(404).json({
        erro: {
            tipo,
            mensagem,
            statusCode
        },
        metodo: req.method,
        url: req.originalUrl,
    });
}
module.exports = notFound;