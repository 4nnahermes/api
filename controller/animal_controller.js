const animalService = require('../service/animal_service')

function listar(req, res) {
    const listaAnimais = animalService.listar();
    res.json(listaAnimais);
}

function inserir(req, res) {
    let animal = req.body;
    try {

        if (!animal.proprietario) {
            throw { id: 400, message: "O ID do proprietário é obrigatório." };
        }
        
        animalService.inserir(animal);
        res.status(201).json({ msg: 'Inserido com sucesso!'});
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const anim = animalService.buscarPorId(id);
        res.json(anim);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

function atualizar(req, res) {
    const id = +req.params.id;
    let animal = req.body;

    try {
        animalService.atualizar(id, animal);
        res.json({msg: 'Pet atualizado com sucesso!'});
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try {
        const animalDeletado = animalService.deletar(id);
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