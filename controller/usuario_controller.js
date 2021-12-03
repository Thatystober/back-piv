const Usuario = require("../model/usuario")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.listar = (req, res) => {
    Usuario.find({}, (err, usuario) => {
        if(err){
            res.status(500).send(err);
        }
        res.json(usuario.map(usuario =>{
            return(usuario.id, usuario.nome, usuario.email);
            })
        );
    })
}

exports.buscarId = (req, res) => {
    const id = req.params.id;
    Usuario.findById(id, (err,usuario) => {
        if(err){
            res.status(500).send(err);
        }
        if(usuario){
            res.json(usuario);
        }else {
            res.status(404).json({erro: "Usuário não existe!"});
        }
    })
}

exports.inserir = (req,res) => {
    let novoUsuario = new Usuario(req.body);
    novoUsuario.senha = bcrypt.hashSync(req.body.senha,10);
    novoUsuario.save((err, usuario) => {
        if(err){
            res.send(err);
        }
        res.status(201).json(novoUsuario);
    })
}

exports.atualizar = (req,res) => {
    const id = req.params.id;
    const atualizarUsuario = req.body;
    if(req.body.senha){
        atualizarUsuario.senha = bcrypt.hashSync(req.body.senha, 10);
    }

    Usuario.findByIdAndUpdate(id, atualizarUsuario, {new:true}, (err, usuarioAtualizado) => {
        if(err){
            res.status(500).send(err);
        }
        if(usuarioAtualizado){
            res.json(usuarioAtualizado);
        }else{
            res.status(404).json({erro: "Usuário não existe!"})
        }
    })
}

exports.deletar = (req,res) => {
    const id = req.params.id;
    Usuario.findByIdAndDelete(id, (err, usuarioDeletado) => {
        if(err){
            res.status(500).send(err);
        }
        if(usuarioDeletado){
            res.json(usuarioDeletado);
        }else{
            res.status(404).json({erro: "Usuário não existe!"});
        }
    });
}

exports.buscarUsuario = (req,res) => {
    if(req.query && req.query.nome){
        const paramNome = req.query.nome;
        Usuario.findOne({nome: paramNome}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            if(usuario){
                res.json(usuario);
            }else{
                res.status(404).json({erro: "Usuario não existe!"});
            }
        })
    }
}

exports.validarUsuario = (req, res) => {
    if(req.body && req.body.nome && req.body.senha){
        const nomeUsuario = req.body.nome;
        const senhaUsuario = req.body.senha;

        Usuario.findOne({nome: nomeUsuario}, (err, usuario) => {
            if(err){
                res.status(500).send(err);
            }
            // if(usuario && usuario.senha === senhaUsuario){
            if(usuario && bcrypt.compareSync(senhaUsuario, usuario.senha)){
                const token = jwt.sign({
                    id: usuario.id
                },'Th@ty', {expiresIn: "1h"});
                res.status(201).json({token: token});
            }else {
                res.status(401).json({erro: "Usuario ou senha invalido!"})
            }
        });
    } else{
        res.status(401).json({erro: "Usuario ou senha invalido!"});
    }
}

exports.validaToken = (req, res, next) =>{
const token = req.get('x-auth-token');
    if(!token){
        res.status(401).json({erro:"Token Invalido"});
    }else{
        jwt.verify(token, 'Th@ty', (err, payload) =>{
        if(err){
            res.status(401).json({erro:"Token Invalido!"});
            console.log(err);
        }else{
            console.log("Payload"+payload);
            next();
        }
        })
    }
}