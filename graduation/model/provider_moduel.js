const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ProviderSchema = new mongoose.Schema({
    providerCode: String,
    providerName: String,
    provideCode: String,
    provide: String,
    price: String,
    linkman: String,
    phoneNumber: String,
    fax: String,
    desc: String,
    date: String
});

ProviderSchema.plugin(mongoosePaginate);

var Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;