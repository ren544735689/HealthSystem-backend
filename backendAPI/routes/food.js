var express = require('express');
var router = express.Router();
var food = require('../controllers/foodController');

/* GET home page. */
router.get('/', food.getFood);
router.get('/getfoodbyid',food.getCertainFoodbyid);
router.get('/getfoodbyname',food.getCertainFoodbyname);

module.exports = router;
