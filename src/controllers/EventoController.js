const EventoModel = require("../models/EventoModel");
const {
    isRequired,
    isPositiveInteger,
    minLength,
    validar,
} = require("../helpers/validators");
const { NotFoundError, ValidationError } = require("../errors/AppError");

// GET /eventos - listar todos 
function index(req, res, next) {
    try {
        const eventos = EventoModel.listarTodos();
        res.json(eventos);
    } catch (erro) {
        next(erro);
    }
}

// GET /eventos/:id - buscar por ID
function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const evento = EventoModel.buscarPorId(id);
        if (!evento) {
            throw new NotFoundError("Evento");
        }
        res.json(evento);
    } catch (erro) {
        next(erro);
    }
}
/* Explicação da função show
- Recebe o id do evento a ser buscado.
- Encontra o id do evento.
- Se não encontrar, retorna um erro 404(Not Found).
- Se encontrar, retorna o evento encontrado.
*/

// POST /eventos - criar um novo evento (desafio feito com IA)
function store(req, res, next) {
    try {
        const { nome, descricao, data, local, capacidade } = req.body;

        // Validar os dados de entrada
        const erros = validar([
            isRequired(nome, "Nome"),
            isRequired(data, "Data"),
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }

        if (!nome || !data) {
            throw new ValidationError("Nome e data são obrigatórios");
        }

        // Dentro da função store de EventoController.js
        if (capacidade <= 0) {
            throw new ValidationError("A capacidade do evento deve ser maior que zero.");
        }
        const novoEvento = EventoModel.criar({
            nome,
            descricao,
            data,
            local,
            capacidade,
        });
        res.status(201).json(novoEvento);
    } catch (erro) {
        next(erro);
    }
}

/* Explicação da função store 
- Recebe os dados do novo evento no corpo da requisição.
- Valida se os campos obrigatórios estão preenchidos.
- Cria o novo evento utilizando o modelo.
- Retorna o evento criado com status 201 (Created).
*/

// PUT /eventos/:id - atualizar um evento existente
function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { nome, capacidade, descricao, data, local } = req.body;
        // const eventoAtualizado = EventoModel.atualizar(id, req.body);

        if (nome && nome.length < 2) {
            throw new ValidationError("O nome do evento deve ter pelo menos 2 caracteres.");
        }
        // No update, os campos não são obrigatórios (atualização parcial)
        // Mas SE forem enviados, devem ser válidos
        const erros = validar([
            minLength(nome, 3, "Nome"),
            isPositiveInteger(capacidade, "Capacidade"),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }
        const eventoAtualizado = EventoModel.atualizar(id, req.body);

        if (!eventoAtualizado) {
            throw new NotFoundError("Evento");
        }
        res.json(eventoAtualizado);
    } catch (erro) {
        next(erro);
    }
}

/* Explicação da função update
- Recebe o id do evento a ser atualizado.
- Recebe os dados atualizados no corpo da requisição.
- Atualiza o evento utilizando o modelo.
- Se não encontrar, retorna um erro 404(Not Found).
- Se encontrar, retorna o evento atualizado.
*/

// DELETE /eventos/:id - deletar um evento
function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const deletado = EventoModel.deletar(id);
        if (!deletado) {
            throw new NotFoundError("Evento");
        }
        res.status(204).send();
    } catch (erro) {
        next(erro);
    }
}

/* Explicação da função destroy
- Recebe o id do evento a ser deletado.
- Deleta o evento utilizando o modelo.
- Se não encontrar, retorna um erro 404(Not Found).
- Se encontrar, retorna status 204 (No Content) para indicar que a operação foi bem-sucedida sem retornar conteúdo.
*/

module.exports = {
    index,
    show,
    store,
    update,
    destroy,
};
// o controller é responsável por receber as requisições, processar os dados utilizando o modelo e retornar as respostas adequadas.
// Ele atua como uma ponte entre as rotas e o modelo, garantindo que a lógica de negócios seja separada da lógica de roteamento.
// req e res fica nessa camada.