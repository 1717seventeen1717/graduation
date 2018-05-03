const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var GoodsSchema = new mongoose.Schema({
    providerCode: String,
    providerName: String,
    provideCode: String,
    goods: String,
    price: String,
    number: String,
    url: String,
    desc: String,
    date: String
});

GoodsSchema.plugin(mongoosePaginate);

var Goods = mongoose.model('Goods', GoodsSchema);

module.exports = Goods;