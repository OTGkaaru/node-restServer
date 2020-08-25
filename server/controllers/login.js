const express = require('express')
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Usuarios = require("../models/usuarios");

app.post("/login", (req, res) => {
    let body = req.body;
    Usuarios.findOne({ email: body.email }, (err, usuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuario || !bcrypt.compareSync(body.password, usuario.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Usuario o contraseña incorrecta"
                }
            })
        }
        let token = jwt.sign(
            { usuario },
            process.env.TOKEN_SEED,
            { expiresIn: process.env.TOKEN_EXP});

        res.json({
            ok: true,
            usuario,
            token
        })


    })
})

module.exports = app;