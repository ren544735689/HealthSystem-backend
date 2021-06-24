var express = require('express');
var router = express.Router();
var food = require('../controllers/foodController');

/* GET home page. */
router.get('/', food.getFood);
router.post('/getfoodbyid',food.getCertainFoodbyid);
router.post('/getfoodbyname',food.getCertainFoodbyname);

module.exports = router;
