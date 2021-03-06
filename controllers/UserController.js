var mongoose = require('mongoose');
var User = require('../models/User');

class UserController {
    static register(req, res) {
        console.log("registering: " + req.body.firstName);
        User.register(new User({
            username: req.body.username,
            firstName: req.body.firstname
        }), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                return res.send(err);
            } else {
                res.send({
                    success: true,
                    user: user
                });
            }
        });
    }

    static login(req, res) {
        User.authenticate()(req.body.username, req.body.password, (err, user, options) => {
            if (err) return next(err);
            if (user === false) {
                res.status(400).send({
                    message: options.message,
                    success: false
                });
            } else {
                req.login(user, (err) => {
                    res.send({
                        success: true,
                        user: user
                    });
                });
            }
        });
    }

    static getLogin(req, res) {
        console.log(req.user);
        if (req.user) {

            return res.send({
                success: true,
                user: req.user
            });

        } //res.send(500, {status:500, message: 'internal error', type:'internal'}); == deprecated

        res.send({
            success: false,
            message: 'not authorized'
        });
    }
}

module.exports = UserController;