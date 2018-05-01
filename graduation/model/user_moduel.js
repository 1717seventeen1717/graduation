const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phoneNumber: String,
    type: String,
    date: String
});

UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UserSchema);

module.exports = User;