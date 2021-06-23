const jwt = require('jsonwebtoken');

var token_key = 'se';

var verifyToken = (req, res, next) => {
    var token = req.headers['token'];
    if(!token) {
        res.status(403).send({ status: false, message: 'No token privided' });
        return;
    }
    jwt.verify(token, token_secret_key, (err, data) => {
        if(err) {
            res.status(401).send({ status: false, message: "Unauthorized!" });
            return;
        }
        req.idinToken = data.id;
        next();
    });
}

var verifyTokenValidation = (req, res, next) => {
    var token = req.headers['token'];
    if(!token) {
        res.status(403).send({ status: false, message: 'No token privided'});
        return;
    }
    next();
}

const authJwt = {
    verifyToken,
    verifyTokenValidation,
    getPermission
};

module.exports = authJwt;
