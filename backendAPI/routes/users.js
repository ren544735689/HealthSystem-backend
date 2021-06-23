var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', user.getUser);

router.post('/sendCode',user.sendCode)
router.post('/codePhonsLogin',user.codePhoneLogin)


module.exports = router;
