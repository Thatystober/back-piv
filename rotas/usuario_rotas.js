const express = require('express');
const router = express.Router();
const usuarioController = require('../controller/usuario_controller')

router.get('/', usuarioController.validaToken, usuarioController.listar)
router.get('/search', usuarioController.validaToken, usuarioController.buscarUsuario)
router.get('/:id', usuarioController.validaToken, usuarioController.buscarId)
router.post('/', usuarioController.validaToken, usuarioController.inserir)
router.post('/login', usuarioController.validarUsuario)
router.put('/:id', usuarioController.validaToken, usuarioController.atualizar)
router.delete('/', usuarioController.validaToken, usuarioController.deletar)

module.exports = router;