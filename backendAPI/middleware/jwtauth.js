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
    // Blacklist.findOne({invalid_token: token}).exec((err, doc) => {
    //     if(err) {
    //         res.status(500).send({ status: false, message: err});
    //         return;
    //     }
    //     if(doc) {
    //         res.status(403).send({ status: false, message: 'Token invalid' });
    //         return;
    //     }
    //     next();
    // });
}

// var getPermission = (req, res, next) => {
//     User.findById(req.idinToken).exec((err, user) => {
//         if(err) {
//             res.status(500).send({ status: false, message: err});
//             return;
//         }
//         req.permissionInToken = user.type;
//         next();
//     });
// }

const authJwt = {
    verifyToken,
    verifyTokenValidation,
    getPermission
};

module.exports = authJwt;
