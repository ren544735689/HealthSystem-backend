var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', user.getUser);

router.post('/updateinfo', authJwt.verifyTokenValidation, authJwt.verifyToken, userController.updateUserInfo);

router.post('/updatepassword', authJwt.verifyTokenValidation, authJwt.verifyToken, userController.updatePassword);

module.exports = router;
