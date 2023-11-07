const proprietarioService = require('../service/proprietario_service')

function listar(req, res) {
    const listaProprietarios = proprietarioService.listar();
    res.json(listaProprietarios);
}

function inserir(req, res) {
    let proprietario = req.body;
    try {
        proprietarioService.inserir(proprietario);
        res.status(201).json({ msg: 'Inserido com sucesso!'});
    }
    catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

function buscarPorId(req, res) {
    const id = +req.params.id;
    try {
        const prop = proprietarioService.buscarPorId(id);
        res.json(prop);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

function atualizar(req, res) {
    const id = +req.params.id;
    let proprietario = req.body;

    try {
        proprietarioService.atualizar(id, proprietario);
        res.json({msg: 'Proprietário atualizado com sucesso!'});
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

function deletar(req, res) {
    const id = +req.params.id;
    try {
        const proprietarioDeletado = proprietarioService.deletar(id);
        res.json(proprietarioDeletado);
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
    deletar,
}