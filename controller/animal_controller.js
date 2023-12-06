const animalService = require('../service/animal_service')

async function listar(req, res) {
    const listaAnimais = await animalService.listar();
    res.json(listaAnimais);
}

async function inserir(req, res) {
    let animal = req.body;
    try {
        const animalInserido = await animalService.inserir(animal);
        res.status(201).json(animalInserido);
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

async function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const animal = await animalService.buscarPorId(id);
        res.json(animal);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let animal = req.body;

    try {
        const animalAtualizado = await animalService.atualizar(id, animal);
        res.json(animalAtualizado);
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const animalDeletado = await animalService.deletar(id);
        res.json(animalDeletado);
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}