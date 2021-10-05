const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
    nome: String,
    preco: Number,
    autor: String,
    editora: String, 
},
{
    versionKey: false
});

module.exports = mongoose.model("Livro", LivroSchema);