const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var StockSchema = new mongoose.Schema({
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

StockSchema.plugin(mongoosePaginate);

var Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;