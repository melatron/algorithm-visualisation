/**
 * Created by MelatroN on 21/01/2016.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Article = new Schema({
    _creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Article', Article);