const { Client } = require('pg');
const proprietarioRepository = require('../repository/proprietario_repository')

async function listar() {
    return await proprietarioRepository.listar();
}

async function inserir(proprietario) {
    if (proprietario && proprietario.nome && proprietario.cpf && proprietario.telefone && proprietario.endereco) {
        const cpfExistente = await proprietarioRepository.verificarExistenciaCPF(proprietario.cpf); 
        if (cpfExistente) {
            throw { id: 400, message: "CPF já cadastrado no sistema." };
        }
        try {
            return await proprietarioRepository.inserir(proprietario);
        } catch (error) {
            console.error('Erro ao inserir proprietário:', error);
            throw error;
        }
    } else {
        throw { id: 400, message: "Todos os dados devem ser preenchidos." };
    }
}


async function buscarPorId(id_proprietario) {
    const proprietario = await proprietarioRepository.buscarPorId(id_proprietario);
    if (proprietario) {
        return proprietario;
    }
    else {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
}

async function atualizar(id_proprietario, proprietarioAtualizado) {
    const proprietario = await proprietarioRepository.buscarPorId(id_proprietario);
    if (!proprietario) {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
    if (proprietarioAtualizado && proprietarioAtualizado.nome && proprietarioAtualizado.cpf && proprietarioAtualizado.telefone && proprietarioAtualizado.endereco) {
        return await proprietarioRepository.atualizar(id_proprietario, proprietarioAtualizado);
    }
    else {
        throw { id: 400, message: "Nome, CPF, telefone e endereço do proprietário são obrigatórios." }
    }
}

async function deletar(id_proprietario) {
    const proprietarioDeletado = await proprietarioRepository.deletar(id_proprietario);
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