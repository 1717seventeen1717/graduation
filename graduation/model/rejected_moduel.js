const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RejectedSchema = new mongoose.Schema({
    providerCode: String,
    providerName: String,
    provideCode: String,
    goods: String,
    price: String,
    number: String,
    desc: String,
    date: String,
    status: String,
    rejectedNumber: String,
    purchaseId: String
});

RejectedSchema.plugin(mongoosePaginate);

var Rejected = mongoose.model('Rejected', RejectedSchema);

module.exports = Rejected;