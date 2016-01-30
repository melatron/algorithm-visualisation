var express = require('express');
var router = express.Router();
var UserController = require('../controllers/UserController');

function ensureLocalAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
        error: 'Not authenticated!',
    });
}

router.use(ensureLocalAuthenticated);

router.get('/logout', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addFriend', function(req, res, next) {
    var user = req.user;

    res.send(user);
});

module.exports = router;
