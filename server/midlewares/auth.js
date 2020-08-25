const jwt = require("jsonwebtoken");

let valToken = (req, res, next) => {
    let token = req.get("token");
    jwt.verify(token, process.env.TOKEN_SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        req.usuario=decoded.usuario;
        next();
    })
}

module.exports = {
    valToken
}