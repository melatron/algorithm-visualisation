var Article = require('../models/Article');
var Comment = require('../models/Comment');

const WRONG_DATA = 'Wrong data given';

exports.createArticle = function (input, callback) {
    "use strict";
    var createdArticle;
    var data = input.data;
    var user = input.user;

    if (data && user && typeof data.title === 'string' && typeof data.content === 'string') {
        createdArticle = new Article({
            _creator: user._id,
            title: data.title,
            content: data.content
        });

        createdArticle.save(function (err, article) {
            if (err) {
                callback({success: false, error: err})
            } else {
                callback({success: true, article: article});
            }
        });
    } else {
        callback({success: false, error: WRONG_DATA});
    }
};

exports.getArticleById = function (data, callback) {
    'use strict';

    if (data && data.articleId) {
        Article.findOne({_id: data.articleId})
            .populate('comments')
            .exec(function (err, article) {
                if (err) {
                    callback({success: false, error: err});
                } else {
                    callback({success: true, article: article});
                }
            });
    } else {
        callback({success: false, error: WRONG_DATA});
    }
};

exports.addComment = function (input, callback) {
    "use strict";
    var createdComment;
    var data = input.data;
    var user = input.user;
    var article = input.article;

    if (data && user && data.articleId && typeof data.content === 'string') {
        createdComment = new Comment({
            _creator: user._id,
            _article: article._id,
            content: data.content
        });

        createdComment.save(function (err, comment) {
            if (err) {
                callback({success: false, error: err})
            } else {
                article.comments.push(comment);
                article.save(function (err, article) {
                    if (err) {
                        callback({success: false, error: err});
                    } else {
                        callback({success: true, comment: comment});
                    }
                });
            }
        });
    } else {
        callback({success: false, error: WRONG_DATA});
    }
};
