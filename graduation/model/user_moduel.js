const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UsreSchema = new mongoose.Schema({
    username: String,
    password: String,
    phoneNumber: String,
    type: String
});

UsreSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UsreSchema);

module.exports = User;