const proprietarioRepository = require('../repository/proprietario_repository')

async function listar() {
    return await proprietarioRepository.listar();
}

async function inserir(proprietario) {
      if (proprietario && proprietario.nome && proprietario.cpf && proprietario.telefone && proprietario.endereço) {
        const client = new Client(conexao);
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
    const proprietario = await proprietarioRepository.buscarPorId(id);
    if (proprietario) {
        return proprietario;
    }
    else {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
}

async function atualizar(id, proprietarioAtualizado) {
    const proprietario = await proprietarioRepository.buscarPorId(id);
    if (!proprietario) {
        throw { id: 404, message: "Proprietário não encontrado." }
    }
    if (proprietarioAtualizado && proprietarioAtualizado.nome && proprietarioAtualizado.cpf && proprietarioAtualizado.telefone && proprietarioAtualizado.endereço) {
        return await proprietarioRepository.atualizar(id, proprietarioAtualizado);
    }
    else {
        throw { id: 400, message: "Nome, CPF, telefone e endereço do proprietário são obrigatórios." }
    }
}

async function deletar(id) {
    const proprietarioDeletado = await proprietarioRepository.deletar(id);
    if (proprietarioDeletado) {
        return proprietarioDeletado;
    }
    else {
        throw { id: 404, message: "Proprietário não encontrado." };
    }
}

async function pesquisarPorLikeNome(nome) {
    const proprietariosEncontrados = await proprietarioRepository.pesquisarPorLikeNome(nome);
    
    if (proprietariosEncontrados.length > 0) {
        return proprietariosEncontrados;
    } else {
        throw { id: 404, message: "Nenhum proprietário encontrado com o nome fornecido." };
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


