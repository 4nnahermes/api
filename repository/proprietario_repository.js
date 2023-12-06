const {Client} = require('pg');

const conexao = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "veterinaria"
}

async function listar() {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query("SELECT * FROM proprietarios");
    const listaProprietarios = result.rows;
    await client.end();
    return listaProprietarios;
}

async function inserir(proprietario) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(
        "INSERT INTO proprietarios(nome, cpf, telefone, endereco)"+
        "VALUES ($1, $2, $3, $4) RETURNING *",
        [proprietario.nome, proprietario.cpf, proprietario.telefone, proprietario.endereco]);
    const proprietarioInserido = result.rows[0];
    await client.end();
    return proprietarioInserido;
}
    

async function buscarPorId(id_proprietario) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('SELECT * FROM proprietarios WHERE id_proprietario=$1', [id_proprietario]);
    const proprietario = result.rows[0];
    await client.end();
    return proprietario;
}

async function atualizar(id_proprietario, proprietario) {
    const sql = 'UPDATE proprietarios set nome=$1, cpf=$2, telefone=$3, endereco=$4 WHERE id_proprietario=$5 RETURNING *'
    const values = [proprietario.nome, proprietario.cpf, proprietario.telefone, proprietario.endereco, id_proprietario];

    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(sql,values);
    const proprietarioAtualizado = result.rows[0];
    await client.end();
    return proprietarioAtualizado;
}

async function deletar(id_proprietario) {
   const sql = 'DELETE FROM proprietarios WHERE id_proprietario=$1 RETURNING *'
   const values = [id_proprietario];

   const client = new Client(conexao);
   await client.connect();
   const result = await client.query(sql,values);
   const proprietarioDeletado = result.rows[0];
   await client.end();
   return proprietarioDeletado;
}

async function verificarExistenciaCPF(cpf) {
    const client = new Client(conexao);
    await client.connect();

    try {
        const result = await client.query('SELECT COUNT(*) FROM proprietarios WHERE cpf=$1', [cpf]);
        const quantidade = parseInt(result.rows[0].count);
        return quantidade > 0;
    } finally {
        await client.end();
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    verificarExistenciaCPF
};