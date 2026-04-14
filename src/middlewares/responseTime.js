function responseTime(req, res, next) {
    const inicio = Date.now();
    
    // Aguardamos o evento 'finish' para garantir que o tempo calculado inclua todo o processamento do Controller e Service
    res.on("finish", () => {
        const duracao = Date.now() - inicio;
        console.log(`[${req.method} ${req.url}] ${res.statusCode} - ${duracao}ms`);
    });
    
    next();
}

module.exports = responseTime;