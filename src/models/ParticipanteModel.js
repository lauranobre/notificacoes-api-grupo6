// Dados iniciais (seed)
let participantes = [
    { id: 1, nome: "Ana Silva", email: "ana@email.com" },
    { id: 2, nome: "Carlos Souza", email: "carlos@email.com" },
    { id: 3, nome: "Maria Santos", email: "maria@email.com" },
];

// Variável para controlar o próximo ID a ser atribuído a um evento
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
        nome: dados.nome,
        email: dados.email,
    };
    proximoId++; // Incrementa o próximo ID para o próximo participante
    participantes.push(novoParticipante);
    return novoParticipante;
}

function atualizar(id, dados) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return null; // Participante não encontrado

    participantes [index] = {
        ...participantes[index], // mantém os dados antigos
        ...dados, // sobrescreve com os novos
        id: id, // garante que o ID não mude
    };

    return participantes[index];
}

function deletar(id) {
    const index = participantes.findIndex((participante) => participante.id === id);
    if (index === -1) return false; // Participante não encontrado

    participantes.splice(index, 1); // Remove o participante antigo
    return true; // Atualização bem-sucedida
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};