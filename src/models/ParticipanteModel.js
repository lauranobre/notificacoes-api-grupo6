let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];

let proximoId = 4;

function listarTodos() {
    return participantes;
}

function buscarPorId(id) {
    return participantes.find((participante) => participante.id === id);
}

function criar(dados) {
    const novoParticipante = {
        id: proximoId,
        ...dados,
    };

    proximoId++;
    participantes.push(novoParticipante);

    return novoParticipante;
}

function atualizar(id, dados) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return null;

    participantes[index] = {
        ...participantes[index],
        ...dados,
        id: id,
    };

    return participantes[index];
}

function deletar(id) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return false;

    participantes.splice(index, 1);
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};