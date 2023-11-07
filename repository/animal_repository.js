let listaAnimais = [];
let idGerador = 1;

function listar() {
    return listaAnimais;
}

function geraId() {
    return idGerador++;
}

function inserir(animal) {
    animal.id = geraId();
    listaAnimais.push(animal);
}

function buscarPorId(id) {
    return listaAnimais.find(function (animal) {
        return (animal.id === id);
    })
}

function atualizar(id, animal) {
    for (let ind in listaAnimais) {
        if (listaAnimais[ind].id === id) {
            listaAnimais[ind] = animal;
            listaAnimais[ind].id = id;
            return;
        }
    }
}

function deletar(id) {
    for (let ind in listaAnimais) {
        if (listaAnimais[ind].id === id) {
            return listaAnimais.splice(ind, 1)[0];
        }
    }
}

function pesquisarPorLikeNome(nome) {
    return listaAnimais.filter(
        (animal) => {
            return animal.nome.toUpperCase().includes(nome.toUpperCase());
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