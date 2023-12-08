const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    database: "veterinaria",
    user: "postgres",
    password: "123456"
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
        "VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [animal.nome, animal.especie, animal.raca, animal.cor, animal.id_proprietario]);
    const animalInserido = result.rows[0];
    await client.end();
    return animalInserido;
    
}

async function buscarPorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('SELECT * FROM animais WHERE id=$1', [id]);
    const animal = result.rows[0];
    await client.end();
    return animal;
}

async function atualizar(id, animal) {
    const sql = 'UPDATE animais set nome=$1, especie=$2, raca=$3, cor=$4, id_proprietario=$5 WHERE id=$6 RETURNING *'
    const values = [animal.nome, animal.especie, animal.raca, animal.cor, animal.id_proprietario, id];

    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(sql, values);
    const animalAtualizado = result.rows[0];
    await client.end();
    return animalAtualizado;
}

async function deletar(id) {
    const sql = 'DELETE FROM animais WHERE id=$1 RETURNING *'
    const values = [id];

    const client = new Client(conexao);
    await client.connect();
    const res = await client.query(sql,values);
    const animalDeletado = res.rows[0];
    await client.end();
    return animalDeletado;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
};