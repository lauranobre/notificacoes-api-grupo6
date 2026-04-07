// src/services/ParticipanteService.js
const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");
const {
  isRequired,
  isEmail,
  minLength,
  validar,
} = require("../helpers/validators");

const ParticipanteService = {
  listarTodos() {
    return ParticipanteModel.listarTodos();
  },

  buscarPorId(id) {
    const participante = ParticipanteModel.buscarPorId(id);
  if (!participante) {
    throw new NotFoundError("Participante não encontrado");
  }
    return participante;
  },

  criar(dados) {
    const { nome, email } = dados;

  const erros = validar([
    isRequired(nome, "nome"),
    minLength(nome, 3, "nome"),
    isRequired(email, "email"),
    isEmail(email, "email"),
  ]);

  if (erros) {
    throw new ValidationError(erros.join("; "));
  }

  return ParticipanteModel.criar({ nome, email });
},

atualizar(id, dados) {
  const { nome, email } = dados;

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
},

deletar(id) {
        const excluido = ParticipanteModel.deletar(id);
        if (!excluido) {
            throw new NotFoundError("Não foi possível excluir: Participante não encontrado.");
        }
        return excluido;
    }
};

module.exports = ParticipanteService;