var express = require('express');
var router = express.Router();
var pr = require('../controllers/personalrecordcontroller');

/* GET home page. */
router.get('/', pr.getFood);

module.exports = router;
