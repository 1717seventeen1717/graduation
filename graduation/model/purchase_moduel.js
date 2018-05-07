const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var PurchaseSchema = new mongoose.Schema({
    providerCode: String,
    providerName: String,
    provideCode: String,
    goods: String,
    price: String,
    number: String,
    desc: String,
    date: String,
    status: String
});

PurchaseSchema.plugin(mongoosePaginate);

var Purchase = mongoose.model('Purchase', PurchaseSchema);

module.exports = Purchase;