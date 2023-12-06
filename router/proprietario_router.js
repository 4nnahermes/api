const express = require('express')
const router = express.Router()
const proprietarioController = require('../controller/proprietario_controller')

//router: /api/proprietarios
router.get('/', proprietarioController.listar);
router.post('/', proprietarioController.inserir);
router.get('/:id_proprietario', proprietarioController.buscarPorId);
router.put('/:id_proprietario', proprietarioController.atualizar);
router.delete('/:id_proprietario', proprietarioController.deletar);

module.exports = router;