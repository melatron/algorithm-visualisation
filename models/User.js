/**
 * Created by MelatroN on 08/01/2016.
 */
'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    uuid: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    active: {
        type: String,
        required: false
    }
});

var options = ({missingPasswordError: "Wrong password"});
User.plugin(passportLocalMongoose,options);

module.exports = mongoose.model('User', User);