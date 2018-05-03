const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ChecksSchema = new mongoose.Schema({
    userid: String,
    userName: String,
    provideCode: String,
    goods: String,
    number: String,
    price: String,
    sum: String,
    area: String,
    status: String,
    desc: String,
    url: String,
    date: String
});

ChecksSchema.plugin(mongoosePaginate);

var Checks = mongoose.model('Checks', ChecksSchema);

module.exports = Checks;