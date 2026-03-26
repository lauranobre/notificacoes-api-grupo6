class AppError extends Error { 
constructor(mensagem, statusCode) {
super(mensagem);
this.statusCode = statusCode;
this.name = "AppError";
}
}
//Esse app error ele é a classe base para todos os erros, estende o Error que ja vem no JS e depois adiciona um statusCode.



class NotFoundError extends AppError { 
constructor(recurso = "Recurso") {
super(`${recurso} não encontrado(a)`, 404);
this.name = "NotFoundError";
}
}
//Esse NotFoundError é pra quando um recurso não é encontrado que é aquele erro 404


class ValidationError extends AppError {
constructor(mensagem) {
super(mensagem, 400);
this.name = "ValidationError";
}
}
module.exports = { AppError, NotFoundError, ValidationError };
//Pra quando colocarmos um dado inválido ele responder que é inválido (logo, ele não irá aceitar)