const express = require('express')
const router = express.Router()
const proprietarioController = require('../controller/proprietario_controller')

//acessar o swagger: localhost:3000/docs/

/**
 * @swagger
 * /api/proprietarios:
 *   get:
 *     tags:
 *       - Proprietário
 *     description: Retorna uma lista de todos os proprietários presentes no banco de dados
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 */
router.get('/', proprietarioController.listar);

/**
 * @swagger
 * /api/proprietarios:
 *   post:
 *     tags:
 *       - Proprietário
 *     description: Insere informações de proprietário no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - description: Objeto proprietário
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *       400:
 *         description: Todos os dados devem ser preenchidos.
 */
router.post('/', proprietarioController.inserir);

/**
 * @swagger
 * /api/proprietarios/{id}:
 *   get:
 *     tags:
 *       - Proprietário
 *     description: Retorna um proprietário por id presente no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do proprietário
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *       400:
 *         description: Proprietário
 */
router.get('/:id_proprietario', proprietarioController.buscarPorId);

/**
 * @swagger
 * /api/proprietarios/{id}:
 *   put:
 *     tags:
 *       - Proprietário
 *     description: Atualiza informações de um proprietário no banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do proprietário
 *         type: integer
 *       - in: body
 *         name: body
 *         description: Objeto proprietário
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *       400:
 *         description: Nome, CPF, telefone e endereço do proprietário são obrigatórios.
 *       404:
 *         description: Proprietário não encontrado. 
 */
router.put('/:id_proprietario', proprietarioController.atualizar);

/**
 * @swagger
 * /api/proprietarios/{id}:
 *   delete:
 *     tags:
 *       - Proprietário
 *     description: Remove um proprietário do banco de dados
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do proprietário
 *         type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *         schema:
 *           $ref: '#/components/schemas/Proprietário'
 *       400:
 *         description: Proprietário não encontrado.
 */
router.delete('/:id_proprietario', proprietarioController.deletar);

module.exports = router;