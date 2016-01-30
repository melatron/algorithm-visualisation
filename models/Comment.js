/**
 * Created by MelatroN on 21/01/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Comment = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Comment', Comment);