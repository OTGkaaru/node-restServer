const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const _ = require("underscore")
const Usuarios = require("../models/usuarios");
app.get('/usuario', function (req, res) {

    let desce = Number(req.query.desde) || 0;
    let hasta = Number(req.query.hasta) || 3;
    Usuarios.find({}, "nombre email")
        .skip(desce)
        .limit(hasta)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json(usuarios)
        })
})


app.post('/usuario', function (req, res) {
    let body = req.body
    let usuario = new Usuarios({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })
    usuario.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            userDB
        })
    })

})
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"])
    Usuarios.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            user: userDB
        })
    })

})
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    Usuarios.findByIdAndRemove(id, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                err: { message: "Usuario no encontrado" }
            })
        }
        res.json({
            ok: true,
            user: usuario
        })
    })
})

module.exports = app;