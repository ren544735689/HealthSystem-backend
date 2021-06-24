var express = require('express');
var router = express.Router();
var period = require('../controllers/periodcontroller');

/* GET home page. */
router.get('/', period.getPeriod);
router.post('/addperiod',period.addPerioddata);
router.post('/updateperiod',period.updatePerioddata);
router.post('/getperiod',period.getPerioddata);

module.exports = router;
