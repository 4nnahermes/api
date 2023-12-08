const express = require('express');
const router = express.Router();
const animalController = require('../controller/animal_controller');

//acessar o swagger: localhost:3000/docs/

/**
 * @swagger
 * /api/animais:
 *   get:
 *     tags:
 *       - Animal
 *     description: Retorna uma lista de todos os animais presentes no banco de dados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 */
router.get('/', animalController.listar);

/**
 * @swagger
 * /api/animais:
 *   post:
 *     tags:
 *       - Animal
 *     description: Insere informações de animal no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - description: Objeto animal
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Todos dados do animal devem ser preenchidos.
 */
router.post('/', animalController.inserir);

/**
 * @swagger
 * /api/animais/{id}:
 *   get:
 *     tags:
 *       - Animal
 *     description: Retorna um animal por id presente no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do animal
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Pet não encontrado.
 */
router.get('/:id', animalController.buscarPorId);

/**
 * @swagger
 * /api/animais/{id}:
 *   put:
 *     tags:
 *       - Animal
 *     description: Atualiza informações de um animal no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do animal
 *         type: integer
 *       - in: body
 *         name: body
 *         description: Objeto animal
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Todos os campos devem ser preenchidos
 *       404:
 *         description: Pet não encontrado 
 */
router.put('/:id', animalController.atualizar);

/**
 * @swagger
 * /api/animais/{id}:
 *   delete:
 *     tags:
 *       - Animal
 *     description: Remove um animal do banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do animal
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Animal'
 *       400:
 *         description: Pet não encontrado.
 */
router.delete('/:id', animalController.deletar);

module.exports = router;
