let eventos = [
    {
        id: 1,
        nome: "Workshop de Node.js",
        descricao: "Aprenda Node.js do zero",
        data: "2025-08-15",
        local: "SENAI - Sala 3",
        capacidade: 30,
    },
    {
        id: 2,
        nome: "Hackathon SENAI 2025",
        descricao: "Maratona de programação",
        data: "2025-09-20",
        local: "SENAI - Auditório",
        capacidade: 100,
    },
];

let proximoId = 3;

function listarTodos() {
    return eventos;
}

function buscarPorId(id) {
    return eventos.find((evento) => evento.id === id);
}

function criar(dados) {
    const novoEvento = {
        id: proximoId,
        ...dados,
    };

    proximoId++;
    eventos.push(novoEvento);

    return novoEvento;
}

function atualizar(id, dados) {
    const index = eventos.findIndex((evento) => evento.id === id);
    if (index === -1) return null;

    eventos[index] = {
        ...eventos[index],
        ...dados,
        id: id,
    };

    return eventos[index];
}

function deletar(id) {
    const index = eventos.findIndex((evento) => evento.id === id);
    if (index === -1) return false;

    eventos.splice(index, 1);
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};