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
    const id = +req.params.id;
    try {
        const prop = await proprietarioService.buscarPorId(id);
        res.json(prop);
    }
    catch(err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function atualizar(req, res) {
    const id = +req.params.id;
    let proprietario = req.body;

    try {
        const proprietarioAtualizado = await proprietarioService.atualizar(id, proprietario);
        res.json(proprietarioAtualizado);
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function deletar(req, res) {
    const id = +req.params.id;
    try {
        const proprietarioDeletado = await proprietarioService.deletar(id);
        res.json(proprietarioDeletado);
    }
    catch (err) {
        res.status(err.id).json({msg: err.message});
    }
}

async function pesquisarPorLikeNome(req, res) {
    const nome = req.query.nome; 
    try {
        const proprietariosEncontrados = await proprietarioService.pesquisarPorNomeLike(nome);
        res.json(proprietariosEncontrados);
    } catch (err) {
        res.status(err.id).json({ msg: err.message });
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorLikeNome
}