const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var SendSchema = new mongoose.Schema({
    checkid: String,
    userid: String,
    userName: String,
    // provideCode: String,
    workerName: String,
    goods: String,
    phoneNumber: String,
    number: String,
    price: String,
    sum: String,
    area: String,
    status: String,
    // desc: String,
    // url: String,
    date: String
});

SendSchema.plugin(mongoosePaginate);

var Send = mongoose.model('Send', SendSchema);

module.exports = Send;