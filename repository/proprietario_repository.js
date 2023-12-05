const { Client } = require('pg');

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
    if (proprietario && proprietario.nome && proprietario.cpf && proprietario.telefone && proprietario.endereco) {
        const client = new proprietarioRepository.Client(conexao);
        await client.connect();

        try {
            const result = await client.query('SELECT COUNT(*) FROM proprietarios WHERE cpf = $1', [proprietario.cpf]);
            const quantidade = parseInt(result.rows[0].count);

            if (quantidade > 0) {
                throw { id: 400, message: "CPF já cadastrado no sistema." };
            }

            const resultadoInsercao = await client.query(
                "INSERT INTO proprietarios(nome, cpf, telefone, endereco)" +
                "VALUES ($1, $2, $3, $4) RETURNING *",
                [proprietario.nome, proprietario.cpf, proprietario.telefone, proprietario.endereco]
            );

            const proprietarioInserido = resultadoInsercao.rows[0];
            return proprietarioInserido;
        } finally {
            await client.end();
        }
    } else {
        throw { id: 400, message: "Todos dados devem ser preenchidos." };
    }
}

async function buscarPorId(id) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query('SELECT * FROM proprietarios WHERE id=$1', [id]);
    const proprietario = result.rows[0];
    await client.end();
    return proprietario;
}

async function atualizar(id, proprietario) {
    const sql = 'UPDATE proprietarios set nome=$1, cpf=$2, telefone=$3, endereco=$4 RETURNING *'
    const values = [proprietario.nome, proprietario.cpf, proprietario.telefone, proprietario.endereco];

    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(sql,values);
    const proprietarioAtualizado = result.rows[0];
    await client.end();
    return proprietarioAtualizado;
}

async function deletar(id) {
   const sql = 'DELETE FROM proprietarios WHERE id=$1 RETURNING *'
   const values = [id];

   const client = new Client(conexao);
   await client.connect();
   const result = await client.query(sql,values);
   const proprietarioDeletado = result.rows[0];
   await client.end();
   return proprietarioDeletado;
}

async function pesquisarPorLikeNome(nome) {
    const client = new Client(conexao);
    await client.connect();
    const result = await client.query(
        'SELECT * FROM proprietarios WHERE UPPER (nome) LIKE $1',
        [`%${nome.toUpperCase()}%`]
    );
    const listaProprietarios = result.rows;
    await client.end();
    return listaProprietarios;
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar,
    pesquisarPorLikeNome
};