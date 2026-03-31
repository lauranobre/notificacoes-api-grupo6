const ParticipanteModel = require("../models/ParticipanteModel");
const { NotFoundError, ValidationError } = require("../errors/AppError");


//O que cada bloco faz estará embaixo!

function index(req, res, next) {
    try {
        const participantes = ParticipanteModel.listarTodos();
        res.json(participantes);
    } catch (erro) {
        next(erro);
    }  
}
//index (Listagem Geral) O que faz: Busca todos os registros do banco de dados. 
// Lógica: Ele chama o método listarTodos() do Model. 
// Se der certo, retorna a lista completa com status 200 OK. 
// Se algo falhar (ex: erro de conexão), o catch captura e passa para o próximo middleware de erro.


function show(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const participante = ParticipanteModel.buscarPorId(id);
        
        if (!participante) {
            // Lançando erro 404 customizado
            throw new NotFoundError("Participante não encontrado.");
        }
        res.json(participante);
    } catch (erro) {
        next(erro);
    }
}
//show (Busca por ID) O que faz: Procura um participante específico usando o ID enviado na URL (/participantes/:id). 
// Lógica: Converte o ID para número e consulta o Model. Ponto chave: Se o Model retornar vazio, ele "levanta a mão" e lança um NotFoundError. 
// Isso interrompe a execução e pula direto para o tratamento de erro.

function store(req, res, next) {
    try {
        const { nome, email } = req.body;

        // Validar os dados de entrada
        const erros = validar([
            isRequired(nome, "Nome"),
            minLength(nome, 2, "Nome"),
            isRequired(email, "Email,"),
            isEmail(email),
        ]);
        if (erros) {
            throw new ValidationError(erros.join("; "));
        }


        // Validação de campos obrigatórios
        if (!nome || !email) {
            throw new ValidationError("Nome e e-mail são obrigatórios.");
        }

        // Validação de formato de e-mail
        if (email && !email.includes("@")) {
            throw new ValidationError("E-mail inválido.");
        }

        const novoParticipante = ParticipanteModel.criar({ nome, email });
        res.status(201).json(novoParticipante);
    } catch (erro) {
        next(erro);
    }
}
//store (Criação/Cadastro) O que faz: Recebe dados do corpo da requisição (body) para criar um novo registro. 
// Lógica: * Validação Simples: Verifica se os campos existem. 
// Validação de Regra: Checa se o e-mail tem o caractere @. Se os dados estiverem errados, lança um ValidationError (400 Bad Request). 
// Se estiverem OK, salva e retorna o objeto criado com status 201 Created.


function update(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const { nome, email } = req.body;

        const atualizado = ParticipanteModel.atualizar(id, { nome, email });
        
        if (!atualizado) {
            throw new NotFoundError("Não foi possível atualizar: Participante não encontrado.");
        }

        res.json(atualizado);
    } catch (erro) {
        next(erro);
    }
}
//update (Atualização) O que faz: Altera os dados de um participante que já existe. 
// Lógica: Recebe o ID pela URL e os novos dados pelo corpo. 
// Ele tenta atualizar; se o Model não encontrar o ID para atualizar, ele lança um NotFoundError. 
// Caso contrário, devolve o objeto já atualizado.


function destroy(req, res, next) {
    try {
        const id = parseInt(req.params.id);
        const excluido = ParticipanteModel.deletar(id);

        if (!excluido) {
            throw new NotFoundError("Não foi possível excluir: Participante não encontrado.");
        }

        res.status(204).send(); // 204 No Content para exclusões bem-sucedidas
    } catch (erro) {
        next(erro);
    }
}

module.exports = { index, show, store, update, destroy };
//O que faz: Remove um participante do sistema. 
// Lógica: Tenta deletar pelo ID. Se não encontrar o registro, lança erro 404. 
// Se encontrar e deletar, retorna o status 204 No Content, que avisa ao navegador: 
// "Deu certo, mas não tenho mais nada para te mostrar (já que o registro sumiu)".