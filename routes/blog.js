var express = require('express');
var router = express.Router();
var BlogController = require('../controllers/BlogController');

function ensureLocalAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({
        error: 'Not authenticated!'
    });
}

router.use(ensureLocalAuthenticated);

router.post('/postArticle', BlogController.postArticle);

router.post('/postComment', BlogController.commentArticle);

router.post('/getArticle', BlogController.getArticleById);

module.exports = router;
