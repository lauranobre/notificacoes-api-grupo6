const EventoModel = require("../models/EventoModel");

// GET /eventos - listar todos 
function index(req, res) {
    const eventos = EventoModel.listarTodos(); // o req recenbe a requisição
    res.json(eventos);
}

// GET /eventos/:id - buscar por ID
function show(req, res) {
    const id = parseInt(req.params.id);
    const evento = EventoModel.buscarPorId(id);

    if (!evento) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.json(evento);
}

/* Explicação da função show
- Recebe o id do evento a ser buscado.
- Encontra o id do evento.
- Se não encontrar, retorna um erro 404(Not Found).
- Se encontrar, retorna o evento encontrado.
*/

// POST /eventos - criar um novo evento (desafio feito com IA)
function store(req, res) {
    const { nome, descricao, data, local, capacidade } = req.body;

    // 1. Validação do Nome (obrigatório e não vazio)
    if (!nome || nome.trim() === "") {
        return res.status(400).json({ erro: "O nome do evento é obrigatório e não pode ser vazio." });
    }

    // Validação da Data (já existia no seu código)
    if (!data) {
        return res.status(400).json({ erro: "A data do evento é obrigatória." });
    }

    // 2. Validação da Capacidade (se informada, deve ser um número positivo)
    if (capacidade !== undefined && (typeof capacidade !== 'number' || capacidade <= 0)) {
        return res.status(400).json({ erro: "A capacidade deve ser um número positivo." });
    }

    // Se passou por todas as validações, cria o evento
    const novoEvento = EventoModel.criar({
        nome,
        descricao,
        data,
        local,
        capacidade,
    });
    
    res.status(201).json(novoEvento); // 201 Created
}

/* Explicação da função store 
- Recebe os dados do novo evento no corpo da requisição.
- Valida se os campos obrigatórios estão preenchidos.
- Cria o novo evento utilizando o modelo.
- Retorna o evento criado com status 201 (Created).
*/

// PUT /eventos/:id - atualizar um evento existente
function update(req, res) {
    const id = parseInt(req.params.id);
    const eventoAtualizado = EventoModel.atualizar(id, req.body);

    if (!eventoAtualizado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.json(eventoAtualizado);
}

/* Explicação da função update
- Recebe o id do evento a ser atualizado.
- Recebe os dados atualizados no corpo da requisição.
- Atualiza o evento utilizando o modelo.
- Se não encontrar, retorna um erro 404(Not Found).
- Se encontrar, retorna o evento atualizado.
*/

// DELETE /eventos/:id - deletar um evento
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const deletado = EventoModel.deletar(id);

    if (!deletado) {
        return res.status(404).json({ erro: "Evento não encontrado" });
    }

    res.status(204).send(); // 204 No Content
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