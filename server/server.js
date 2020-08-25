require("./config/config")
const express = require('express')

const app = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require("./controllers/usuarios"))

mongoose.connect(process.env.NODE_ENVDB,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err, res) => {
        if (err) throw err
        console.log("Conectado a mongoDB");

    })

app.listen(process.env.PORT, () => {
    console.log("Escuchando puerto:", process.env.PORT)
})