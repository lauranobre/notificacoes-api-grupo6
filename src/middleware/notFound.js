function notFound(req, res, next) {

    res.status(404).json({
        erro: "Rota não encontrada",
        metodo: req.method,
        url: req.originalUrl,
    });
}
module.exports = notFound;