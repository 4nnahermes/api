const proprietarioRepository = require('../repository/proprietario_repository')

function listar() {
    return proprietarioRepository.listar();
}

function inserir(proprietario) {
    if (proprietario && proprietario.nome && proprietario.cpf && proprietario.telefone && proprietario.endereço) {
        proprietarioRepository.inserir(proprietario);
    }
    else {
        throw { id: 400, message: "Todos dados devem ser preenchidos." };
    }
}

function buscarPorId(id) {
    const proprietario = proprietarioRepository.buscarPorId(id);
    if (proprietario) {
        return proprietario;
    }
    else {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
}

function atualizar(id, proprietarioAtualizado) {
    const proprietario = proprietarioRepository.buscarPorId(id);
    if (!proprietario) {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
    if (proprietarioAtualizado && proprietarioAtualizado.nome && proprietarioAtualizado.cpf && proprietarioAtualizado.telefone && proprietarioAtualizado.endereço) {
        proprietarioRepository.atualizar(id, proprietarioAtualizado);
    }
    else {
        throw { id: 400, message: "Nome, CPF, telefone e endereço do proprietário são obrigatórios." }
    }
}

function deletar(id) {
    const proprietarioDeletado = proprietarioRepository.deletar(id);
    if (proprietarioDeletado) {
        return proprietarioDeletado;
    }
    else {
        throw { id: 404, message: "Proprietário não encontrado." };
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}


