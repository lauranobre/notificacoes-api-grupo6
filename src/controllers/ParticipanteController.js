const ParticipanteModel = require("../models/ParticipanteModel");

// GET /participantes - listar todos os participantes
function index(req, res) {
    const participantes = ParticipanteModel.listarTodos();
    res.json(participantes);

}

// GET /participantes/:id - buscar por ID
function show(req, res) {
    const id = parseInt(req.params.id);
    const participante = ParticipanteModel.buscarPorId(id);

    if (!participante) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    res.json(participante);
}

// POST /participantes - criar um novo participante
function store(req, res) {
    const { nome, email } = req.body;
    
    if (!nome || !email) {
        return res.status(400).json({ erro: "Nome e email são obrigatórios" });
    }

    const novoParticipante = ParticipanteModel.criar({ 
        nome, 
        email 
    });

    res.status(201).json(novoParticipante);
}

// PUT /participantes/:id - atualizar um participante existente
function update(req, res) {
    const id = parseInt(req.params.id);
    const participanteAtualizado = ParticipanteModel.atualizar(id, req.body);

    if (!participanteAtualizado) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }

    res.json(participanteAtualizado);
}

// DELETE /participantes/:id - deletar um participante
function destroy(req, res) {
    const id = parseInt(req.params.id);
    const participanteDeletado = ParticipanteModel.deletar(id);

    if (!participanteDeletado) {
        return res.status(404).json({ erro: "Participante não encontrado" });
    }
    res.status(204).send();
}

module.exports = { 
    index, 
    show, 
    store, 
    update, 
    destroy 
};