const express = require('express');
const router = express.Router();
const livroController = require('../controller/livro_controller');

// GETS
router.get('/', livroController.listar)
router.get('/buscar', livroController.localizar)
router.get('/:id', livroController.buscarIsbn)
// POSTS
router.post('/', livroController.inserir)
router.put('/:id', livroController.atualizar)
router.delete('/:id', livroController.deletar)

module.exports = router;