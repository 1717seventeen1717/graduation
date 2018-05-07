const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var DeliverySchema = new mongoose.Schema({
    providerCode: String,
    providerName: String,
    provideCode: String,
    goods: String,
    price: String,
    number: String,
    desc: String,
    date: String,
    status: String,
    deliveryNumber: String,
    rejectedNumber: String
});

DeliverySchema.plugin(mongoosePaginate);

var Delivery = mongoose.model('Delivery', DeliverySchema);

module.exports = Delivery;