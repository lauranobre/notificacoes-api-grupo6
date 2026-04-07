const EventoModel = require("../models/EventoModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
    isRequired,
    isPositiveInteger,
    minLength,
    validar,
} = require("../helpers/validators");

function listarTodos() {
    return EventoModel.listarTodos();
}

function buscarPorId(id) {
    const evento = EventoModel.buscarPorId(id);
    if (!evento) {
        throw new NotFoundError("Evento não encontrado.");
    }
    return evento;
}

function criar(dados) {
    const { nome, descricao, data, local, capacidade } = dados;
    
    const erros = validar([
        isRequired(nome, "Nome"),
        isRequired(data, "Data"),
        minLength(nome, 3, "Nome"),
        isPositiveInteger(capacidade, "Capacidade"),
    ]);

    if (erros) {
        throw new ValidationError(erros.join("; "));
    }

    return EventoModel.criar({ nome, descricao, data, local, capacidade });
}

function atualizar(id, dados) {
    const { nome, capacidade } = dados;

    // É boa prática verificar se existe ANTES de tentar atualizar
    const eventoExistente = EventoModel.buscarPorId(id);
    if (!eventoExistente) {
        throw new NotFoundError("Evento não encontrado.");
    }

    // Usando ternário para não quebrar a API se o campo não for enviado
    const erros = validar([
        nome ? minLength(nome, 3, "Nome") : null,
        capacidade ? isPositiveInteger(capacidade, "Capacidade") : null,
    ]);

    if (erros) {
        throw new ValidationError(erros.join("; "));
    }

    return EventoModel.atualizar(id, dados);
}

function deletar(id) {
    const deletado = EventoModel.deletar(id);
    if (!deletado) {
        throw new NotFoundError("Evento não encontrado.");
    }
    return true;
}

module.exports = {
    listarTodos,
    buscarPorId,
    criar,
    atualizar,
    deletar,
};