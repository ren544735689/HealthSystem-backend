var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');

/* GET home page. */
router.get('/', user.getUser);

module.exports = router;
