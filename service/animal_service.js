const animalRepository = require('../repository/animal_repository')
const proprietarioRepository = require('../repository/proprietario_repository')


function listar() {
    return animalRepository.listar();
}

function inserir(animal) {
    if (animal && animal.nome && animal.especie && animal.raca && animal.cor && animal.proprietario) {
        animalRepository.inserir(animal);

        const proprietario = proprietarioRepository.buscarPorId(animal.proprietario);

        if (proprietario) {
            proprietario.animais.push(animal);
        }
    }
    else {
        throw { id: 400, message: "Todos dados devem ser preenchidos." };
    }
}

function buscarPorId(id) {
    const animal = animalRepository.buscarPorId(id);
    if (animal) {
        return animal;
    }
    else {
        throw { id: 404, message: "Pet não encontrado." }
    }
}

function atualizar(id, animalAtualizado) {
    const animal = animalRepository.buscarPorId(id);
    if (!animal) {
        throw { id: 404, message: "Pet não encontrado." }
    }

    if (animalAtualizado && animalAtualizado.nome) {
        animalRepository.atualizar(id, animalAtualizado);
        
        const proprietario = proprietarioRepository.buscarPorId(animal.proprietario);
        const animalIndex = proprietario.animais.findIndex(a => a.id === id);
        
        if (animalIndex !== -1) {
            proprietario.animais[animalIndex] = animalAtualizado;
        }

        proprietarioRepository.atualizar(proprietario.id, proprietario);
    } else {
        throw { id: 400, message: "Nome do pet é obrigatório." }
    }
}

function deletar(id) {
    const animalDeletado = animalRepository.deletar(id);
    if (animalDeletado) {
        const proprietario = proprietarioRepository.buscarPorId(animalDeletado.proprietario);

        if (proprietario) {
            const animalIndex = proprietario.animais.findIndex(a => a.id === id);

            if (animalIndex !== -1) {
                proprietario.animais.splice(animalIndex, 1);
                proprietarioRepository.atualizar(proprietario.id, proprietario);
            }
        }
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