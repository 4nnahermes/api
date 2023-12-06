const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "veterinaria",
    user: "postgres",
    password: "password"
}

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM animais");
    const listaAnimais = result.rows;
    await client.end();
    return listaAnimais;
}

async function inserir(animal) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO animais(nome, especie, raca, cor, id_proprietario)" +
        "VALUES ($1, $2, $3, $4) RETURNING *",
        [animal.nome, animal.especie, animal.raca, animal.cor, animal.id_proprietario]);
    const animalInserido = result.rows[0];
    await client.end();
    return animalInserido;
    
}

function buscarPorId(id) {
    const cliente = ne
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