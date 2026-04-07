// Banco de dados temporário - array em memória (quando reinicar o servidor vai sumir).

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

// Variável para controlar o próximo ID a ser atribuído a um evento
let proximoId = 3;

// Função para listar todos os eventos
function listarTodos() {
    return eventos;
}

// Buscar um evento por ID
function buscarPorId(id) {
    return eventos.find((evento) => evento.id === id);
}

// Criar um novo evento
function criar(dados) {
    const novoEvento = {
        id: proximoId,
        nome: dados.nome,
        descricao: dados.descricao,
        data: dados.data,
        local: dados.local,
        capacidade: dados.capacidade,
    };
    proximoId++; // Incrementa o próximo ID para o próximo evento
    eventos.push(novoEvento);
    return novoEvento;
}

// Atualizar um evento existente
function atualizar(id, dados) {
    const index = eventos.findIndex((evento) => evento.id === id); // o === compara o valor e o tipo, garantindo que ambos sejam iguais.
    if (index === -1) return null; // Evento não encontrado
    
    eventos [index] = {
        ...eventos[index], // mantém os dados antigos
        ...dados, // sobrescreve com os novos
        id: id, // garante que o ID não mude
    };

    return eventos[index]; // Retorna o evento atualizado
}

/* Explicação da função de atualizar 
- Recebe o id e os novos dados.
- Encontra o id pra ser atualizado.
- Se não encontrar, retorna null.
- Se encontrar, atualiza o evento mantendo os dados antigos e com os novos.
- Retorna o evento atualizado.
- Os 3 pontos servem para copiar os dados antigos e depois sobrescrever com os novos (o Id não muda).
*/


// Deletar um evento
function deletar(id) {
    const index = eventos.findIndex((evento) => evento.id === id);
    if (index === -1) return false; // Evento não encontrado

    eventos.splice(index, 1); // Remove o evento antigo
    return true; // Retorna true para indicar que a atualização foi bem-sucedida
}

/* Explicação da função de deletar
- Recebe o id do evento a ser deletado.
- Encontra o id do evento.
- Se não encontrar, retorna false.
- Se encontrar, remove o evento do array.
- Retorna true para indicar que a deleção foi bem-sucedida.
*/

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};

// Gerencia os dados.