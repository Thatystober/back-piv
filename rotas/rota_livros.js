const express = require('express');
const router = express.Router();
const livroController = require('../controller/livro_controller');

// GETS
router.get('/', livroController.listar) // funciona
router.get('/buscar', livroController.localizar) // funciona (por nome)
router.get('/localizar', livroController.buscarIsbn) // funciona
// POSTS
router.post('/', livroController.inserir) // funciona
router.put('/:id', livroController.atualizar)
router.delete('/:id', livroController.deletar)

module.exports = router;