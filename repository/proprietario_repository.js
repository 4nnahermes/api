let listaProprietarios = [];
let idGerador = 1;

function listar() {
    return listaProprietarios;
}

function geraId() {
    return idGerador++;
}

function inserir(proprietario) {
    proprietario.id = geraId();
    proprietario.animais = [];
    listaProprietarios.push(proprietario);
}

function buscarPorId(id) {
    return listaProprietarios.find(function (proprietario) {
        return (proprietario.id === id);
    })
}

function atualizar(id, proprietario) {
    for (let ind in listaProprietarios) {
        if (listaProprietarios[ind].id === id) {
            listaProprietarios[ind] = proprietario;
            listaProprietarios[ind].id = id;
            return;
        }
    }
}

function deletar(id) {
    for (let ind in listaProprietarios) {
        if (listaProprietarios[ind].id === id) {
            return listaProprietarios.splice(ind, 1)[0];
        }
    }
}

function pesquisarPorLikeNome(nome) {
    return listaProprietarios.filter(
        (proprietario) => {
            return proprietario.nome.toUpperCase().includes(nome.toUpperCase());
        }
    )
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorLikeNome
};