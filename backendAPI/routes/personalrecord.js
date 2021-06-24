var express = require('express');
var router = express.Router();
var personalrecord = require('../controllers/personalrecordcontroller');

/* GET home page. */
router.get('/', personalrecord.getRecord);
router.post('/getpersonalrecordbyrid',personalrecord.getCertainRecordbyrid);
router.post('/getpersonalrecordbyuid',personalrecord.getCertainRecordbyuid);
router.post('/addrecord',personalrecord.addRecord);
router.post('/deleterecord',personalrecord.deleteRecord);
router.post('/count2',personalrecord.count2Record);
router.post('/countall',personalrecord.countAllRecord);

module.exports = router;
