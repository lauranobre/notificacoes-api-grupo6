const EventoService = require("../services/EventoService");

// GET /eventos - listar todos 
function index(req, res, next) {
    try {
        const eventos = EventoService.listarTodos();
        res.json(eventos);
    } catch (erro) {
        next(erro);
    }
}

// GET /eventos/:id - buscar por ID
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = EventoService.buscarPorId(id);
        res.json(evento);
    } catch (erro) {
        next(erro);
    }
}
/* Explicação da função show
- Recebe o id do evento a ser buscado.
- Encontra o id do evento.
- Se não encontrar, retorna um erro.
- Se encontrar, retorna o evento encontrado.
*/

// POST /eventos - criar um novo evento (desafio feito com IA)
function store(req, res, next) {
    try {
        const novoEvento = EventoService.criar(req.body);
        res.status(201).json(novoEvento);
    } catch (erro) {
        next(erro);
    }
}

/* Explicação da função store  (atualizada)
- Recebe os dados do novo evento no corpo da requisição.
- Chama o servicese para criar o evento.
- Retorna o evento criado com status 201 (Created).
*/

// PUT /eventos/:id - atualizar um evento existente
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const eventoAtualizado = EventoService.atualizar(id, req.body);
        res.json(eventoAtualizado);
    } catch (erro) {
        next(erro);
    }
}

// DELETE /eventos/:id - deletar um evento
function destroy(req, res, next) {
    try {

        const id = parseInt(req.params.id);
        EventoService.deletar(id);
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
// o controller é responsável por receber as requisições, processar os dados utilizando o serviço e retornar as respostas adequadas.
// Ele atua como uma ponte entre as rotas e o serviço, garantindo que a lógica de negócios seja separada da lógica de roteamento.
// req e res fica nessa camada.