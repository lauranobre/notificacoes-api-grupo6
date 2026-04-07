// src/services/ParticipanteService.js
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

function listarTodos() {
  return ParticipanteModel.listarTodos();
}

function buscarPorId(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  return participante;
}

function criar(dados) {
  const { nome, email } = dados;

  const erros = validar([
    isRequired(nome, "nome"),
    minLength(nome, 3, "nome"),
    isRequired(email, "email"),
    isEmail(email, "email"),
  ]);

  if (erros) throw new ValidationError(erros.join("; "));

  return ParticipanteModel.criar({ nome, email });
}

function atualizar(id, dados) {
  const { nome, email } = dados;

  // Verifica se existe
  const participanteExistente = ParticipanteModel.buscarPorId(id);
  if (!participanteExistente) {
    throw new NotFoundError("Participante não encontrado");
  }

  // Validação (campos opcionais)
  const erros = validar([
    nome ? minLength(nome, 3, "nome") : null,
    email ? isEmail(email, "email") : null,
  ]);

  if (erros) throw new ValidationError(erros.join("; "));

  const atualizado = ParticipanteModel.atualizar(id, { nome, email });

  return atualizado;
}

function deletar(id) {
  const participante = ParticipanteModel.buscarPorId(id);

  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }

  ParticipanteModel.deletar(id);

  return { mensagem: "Participante deletado com sucesso" };
}

module.exports = { listarTodos, buscarPorId, criar, atualizar, deletar };