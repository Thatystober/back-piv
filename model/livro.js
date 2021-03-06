const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivroSchema = new Schema({
    isbn: Number,
    nome: String,
    preco: Number,
    autor: String,
    editora: String
},
{
    versionKey: false
});

module.exports = mongoose.model("Livro", LivroSchema);