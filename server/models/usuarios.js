const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")
let roles={
    values:["ADMIN_ROLE", "USER_ROLE"],
    message:"{VALUE} no es un rol valido"
}
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "Nombre necesario"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email necesario"]
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: "USER_ROLE",
        enum:roles
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

usuarioSchema.plugin(uniqueValidator, { message: "{PATH} debe ser unico" });
module.exports = mongoose.model("Usuario", usuarioSchema);