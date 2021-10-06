const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

const rotaLivro = require('./rotas/rota_livros');

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Mongoose - BD
mongoose.connect('mongodb://localhost:27017/app_livros')
  .then(() => {
    console.log('Banco Conectado com sucesso!')
  }).catch((error) => {
    console.log('Erro ao conectar com o Banco.')
  });

  app.use('/livros', rotaLivro);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })