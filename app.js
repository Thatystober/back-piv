const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

const rotaLivro = require('./rotas/rota_livros');
const rotaUsuario = require('./rotas/usuario_rotas');

const usuarioController = require('./controller/usuario_controller')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Mongoose - BD
mongoose.connect('mongodb://localhost:27017/app_livros')
  .then(() => {
    console.log('Banco Conectado com sucesso!')
  }).catch((error) => {
    console.log('Erro ao conectar com o Banco.')
  });

  app.use((req, res, next) => {
    console.log(`Request Time: ${Date.now()}`);
    console.log(`Request Method: ${req.method}`);
    next();
  })

  app.use('/livros', usuarioController.validaToken, rotaLivro);
  app.use('/usuarios', rotaUsuario);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

 