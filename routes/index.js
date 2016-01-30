/**
 * Created by MelatroN on 08/01/2016.
 */
var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

/* GET home page. */

router.get('/', function(req, res){
    res.render('home');
});

/* POST users listing. */
router.post('/login', UserController.login);
router.post('/register', UserController.register);


module.exports = router;
