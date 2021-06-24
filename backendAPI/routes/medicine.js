var express = require('express');
var router = express.Router();
var medicine = require('../controllers/medicinecontroller');

/* GET home page. */
router.get('/', medicine.getMedicine);
router.post('/getmedicinebyid',medicine.getCertainMedicinebyid);
router.post('/getmedicinebyname',medicine.getCertainMedicinebyname);
router.post('/getmedicinebysick',medicine.getCertainMedicinebysick);

module.exports = router;
