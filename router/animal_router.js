const express = require('express')
const router = express.Router()
const animalController = require('../controller/animal_controller')

//router: /api/animais
router.get('/', animalController.listar);
router.post('/', animalController.inserir);
router.get('/:id', animalController.buscarPorId);
router.put('/:id', animalController.atualizar);
router.delete('/:id', animalController.deletar);

module.exports = router;