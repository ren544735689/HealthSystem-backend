var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');

/* GET home page. */
router.get('/', user.getUser);
router.post('/login',user.UserLogin);
router.post('/register',user.UserRegister);

module.exports = router;
