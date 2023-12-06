const proprietarioService = require('../service/proprietario_service')

async function listar(req, res) {
    const listaProprietarios = await proprietarioService.listar();
    res.json(listaProprietarios);
}

async function inserir(req, res) {
    let proprietario = req.body;
    try {
        const proprietarioInserido = await proprietarioService.inserir(proprietario);
        console.log('Código de Status:', 201);
        res.status(201).json(proprietarioInserido);
    } catch (err) {
        console.error('Erro:', err);
        res.status(err.id).json({ msg: err.message });
    }
}

async function buscarPorId(req, res) {
    const id_proprietario = +req.params.id_proprietario;
    try {
        const prop = await proprietarioService.buscarPorId(id_proprietario);
        res.json(prop);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function atualizar(req, res) {
    const id_proprietario = +req.params.id_proprietario;
    let proprietario = req.body;

    try {
        const proprietarioAtualizado = await proprietarioService.atualizar(id_proprietario, proprietario);
        res.json(proprietarioAtualizado);
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id_proprietario = +req.params.id_proprietario;
    try {
        const proprietarioDeletado = await proprietarioService.deletar(id_proprietario);
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
    deletar
}