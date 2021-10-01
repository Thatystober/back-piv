const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.get('/hello', (req, res) => {
      res.send('Hello Everybody!')
    })
  
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  
  console.log("Servidor ja chamou listen");