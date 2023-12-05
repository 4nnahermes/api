const express = require('express')
const router = express.Router()
const proprietarioController = require('../controller/proprietario_controller')

//router: /api/proprietarios
router.get('/', proprietarioController.listar);
router.post('/', proprietarioController.inserir);
router.get('/:id', proprietarioController.buscarPorId);
router.put('/:id', proprietarioController.atualizar);
router.delete('/:id', proprietarioController.deletar);
router.get('/', proprietarioController.pesquisarPorLikeNome);

module.exports = router;