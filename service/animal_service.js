const { Client } = require('pg');
const animalRepository = require('../repository/animal_repository')
const proprietariorepository = require('../repository/proprietario_repository')

async function listar() {
    return await animalRepository.listar();
}

async function inserir(animal) {
    if (animal && animal.nome && animal.especie && animal.raca && animal.cor && animal.id_proprietario) {

        const proprietario = await proprietariorepository.buscarPorId(animal.id_proprietario);
        if (proprietario) {
            return await animalRepository.inserir(animal);
        } else {
            throw { id: 404, message: "Proprietário não encontrado." };
        }
    } else {
        throw { id: 400, message: "Todos dados do animal devem ser preenchidos." };
    }
}

async function buscarPorId(id) {
    const animal = await animalRepository.buscarPorId(id);
    if (animal) {
        return animal;
    }
    else {
        throw { id: 404, message: "Pet não encontrado" }
    }
}

async function atualizar(id, animalAtualizado) {
    const animal = await animalRepository.buscarPorId(id);
    if (!animal) {
        throw { id: 404, message: "Pet não encontrado" }
    }

    if (animalAtualizado && animalAtualizado.nome && animalAtualizado.especie && animalAtualizado.raca && animalAtualizado.cor && animalAtualizado.id_proprietario) {
        return await animalRepository.atualizar(id, animalAtualizado);
    } else {
        throw { id: 400, message: "Todos campos devem ser preenchidos" }
    }
}

async function deletar(id) {
    const animalDeletado = await animalRepository.deletar(id);
    if (animalDeletado) {
        return animalDeletado;
    } else {
        throw { id: 404, message: "Pet não encontrado." };
    }
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}