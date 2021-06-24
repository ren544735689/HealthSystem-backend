var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
    res.json({message: "Welcome to express"})
});


module.exports = router;
