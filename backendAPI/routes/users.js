var express = require('express');
var router = express.Router();
var user = require('../controllers/userController');
var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', user.getUser);
router.post('/login',user.UserLogin);



router.get('/gettest', function(req, res) {
    res.send('get test');
  });
router.post('/posttest', function(req, res) {
    res.send('post test');
});


module.exports = router;
