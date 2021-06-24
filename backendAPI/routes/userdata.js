var express = require('express');
var router = express.Router();
var userdata = require('../controllers/userdatacontroller');

/* GET home page. */
router.get('/', userdata.getUserdata);
router.post('/get1',userdata.get_latest_userdata);
router.post('/get5',userdata.get_5_latest_userdata);
router.post('/adduserdata',userdata.addUserdata);

module.exports = router;
