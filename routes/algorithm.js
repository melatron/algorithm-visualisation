/**
 * Created by MelatroN on 28/01/2016.
 */

var express = require('express');
var router = express.Router();
var AlgorithmController = require('../controllers/AlgorithmController');

function ensureLocalAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
        error: 'Not authenticated!'
    });
}

//router.use(ensureLocalAuthenticated);

router.post('/combSort', AlgorithmController.combSort);
router.post('/quickSort', AlgorithmController.quickSort);

module.exports = router;

