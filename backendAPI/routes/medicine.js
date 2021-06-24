var express = require('express');
var router = express.Router();
var medicine = require('../controllers/medicinecontroller');

/* GET home page. */
router.get('/', medicine.getFood);
router.get('/getmedicinebyid',food.getCertainMedicinebyid);
router.get('/getmedicinebyname',food.getCertainMedicinebyname);

module.exports = router;
