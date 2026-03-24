const InscricaoModel = require("../models/InscricaoModel");
const EventoModel = require("../models/EventoModel");
const ParticipanteModel = require("../models/ParticipanteModel");


// POST /inscricoes — criar uma inscrição
function store(req, res) {
    const { eventoId, participanteId } = req.body;
    if (!eventoId || !participanteId) {
        return res
            .status(400)
            .json({ erro: "eventoId e participanteId são obrigatórios" });
    }
    const resultado = InscricaoModel.criar(
        parseInt(eventoId),
        parseInt(participanteId),
    );

    // Se o resultado tem a propriedade "erro", algo deu errado
    if (resultado.erro) {
        return res.status(400).json(resultado);
    }
    res.status(201).json(resultado);
}


// GET /inscricoes — listar todas
function index(req, res) {
    const inscricoes = InscricaoModel.listarTodas();
    res.json(inscricoes);
}


// GET /inscricoes/evento/:eventoId — listar inscrições de um evento
function listarPorEvento(req, res) {
    const eventoId = parseInt(req.params.eventoId);
    const inscricoes = InscricaoModel.listarPorEvento(eventoId);
    res.json(inscricoes);
}


// PATCH /inscricoes/:id/cancelar — cancelar uma inscrição
function cancelar(req, res) {
    const id = parseInt(req.params.id);
    const resultado = InscricaoModel.cancelar(id);
    if (!resultado) {
        return res.status(404).json({ erro: "Inscrição não encontrada" });
    }
    res.json(resultado);
}

// DESAFIO: 
function obterDetalhes(req, res) {
    // Pega o ID da URL e converte para número
    const id = parseInt(req.params.id); 

    // 1. Busca a inscrição no Model de Inscrição
    const inscricao = InscricaoModel.buscarPorId(id);
    
    // Se não achar, retorna erro 404
    if (!inscricao) {
        return res.status(404).json({ erro: "Inscrição não encontrada." });
    }
    res.json(inscricao);

    const evento = EventoModel.buscarPorId(inscricao.eventoId);
    const participante = ParticipanteModel.buscarPorId(inscricao.participanteId);

    // 3. Monta o objeto exatamente como o desafio pede
    const respostaFormatada = {
        id: inscricao.id,
        status: inscricao.status,
        dataInscricao: inscricao.dataInscricao,
        evento: evento ? {
            id: evento.id,
            nome: evento.nome
        } : null,
        participante: participante ? {
            id: participante.id,
            nome: participante.nome,
            email: participante.email
        } : null
    };
    return res.status(200).json(respostaFormatada);
}

module.exports = { store, index, listarPorEvento, cancelar, obterDetalhes };