// src/helpers/validators.js

function isRequired(valor, campo) {
  if (valor === undefined || valor === null) {
    return `${campo} é obrigatório`;
  }

  if (typeof valor === "string" && valor.trim() === "") {
    return `${campo} não pode ser vazio`;
  }

  return null;
}

function isEmail(valor) {
  if (!valor) return null;

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //alguma coisa + @ + alguma coisa + ponto + alguma coisa

  if (!regex.test(valor)) {
    return "E-mail inválido";
  }

  return null;
}

function isPositiveInteger(valor, campo) {
  if (valor === undefined || valor === null) return null;

  if (!Number.isInteger(valor) || valor <= 0) {
    return `${campo} deve ser um número inteiro positivo`;
  }

  return null;
}

function minLength(valor, minimo, campo) {
  if (!valor) return null;

  if (typeof valor === "string" && valor.trim().length < minimo) {
    return `${campo} deve ter pelo menos ${minimo} caracteres`;
  }

  return null;
}

function validar(validacoes) {
  const erros = validacoes.filter(Boolean);
  return erros.length ? erros : null;
}

module.exports = {
  isRequired,
  isEmail,
  isPositiveInteger,
  minLength,
  validar,
};