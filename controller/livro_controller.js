const Livro = require("../model/livro")

// exports.listar = (req, res) =>{
//     Livro.find({}, (err, livros) => {
//         if(err){
//             res.status(500).send(err);
//         }
//         res.json(livros);
//     })
// }

exports.listar = async (req, res) => {
    try { 
      const livros = await Livro.find({});
      res.json(livros);
    } catch (err) {
      res.status(500).send(err);
    }
}


exports.buscarIsbn = (req, res) => {
    if(req.query.isbn){
        const paramIsbn = req.query.isbn;
        Livro.find({isbn: paramIsbn}, (err, livros) =>{
            if(err){
                res.status(500).send(err);
            }
            if(livros){
                res.json(livros);
            }else {
                res.status(404).json({erro:"Livro não consta na loja online."});
            }
        })
    }else{
        res.status(400).send({erro:"Você precisa inserir o isbn"})
    }
}

// exports.buscarIsbn = (req, res) => {
//     const isbn = req.params.isbn;
//     Livro.find(isbn, (err, livro) => {
//         if(err){
//             res.status(500).send(err);
//         }
//         if(livro){
//             res.json(livro);
//         }else{
//             res.status(404).json({erro:"Livro não consta na loja online."})
//         }
//     })
// }

exports.inserir = (req,res) => {
    let novoLivro = new Livro(req.body);
    novoLivro.save((err, livro) => {
        if(err){
            res.send(err);
        }
        res.status(201).json(novoLivro);
        // if(novoLivro == livro){
        //     res.status(404).json({erro:"Esse livro já existe na loja"})
        // }
    })
    
}

exports.atualizar = (req, res) => {
    const id = req.params.id;
    const livroAtualizar = req.body;

    Livro.findByIdAndUpdate(id, livroAtualizar, {new:true}, 
        (err, livroAtualizado) => {
        if(err){
            res.status(500).send(err);
        }
        if(livroAtualizado){
            res.json(livroAtualizado);
        }else{
            res.status(404).json({erro:"Livro não consta na loja online."})
        }
    })
}   

exports.localizar = (req, res) => {
    if(req.query && req.query.nome){
        const paramNome = req.query.nome;
        Livro.find({nome: paramNome}, (err, livros) =>{
            if(err){
                res.status(500).send(err);
            }
            if(livros && livros.length > 0){
                res.json(livros);
            }else {
                res.status(404).json({erro:"Livro não consta na loja online."});
            }
        })
    }else{
        res.status(400).send({erro:"Você precisa inserir o nome."})
    }
}

exports.deletar  = (req, res) => {
    const id = req.params.id;
    Livro.findByIdAndDelete(id, (err, livroDeletado) =>{
      if(err) {
        res.status(500).send(err);
      }
      if(livroDeletado) {        
        res.json(livroDeletado);
      }
      else {
        res.status(404).json({erro:"Livro não consta na loja online."});
      }
    });
  }