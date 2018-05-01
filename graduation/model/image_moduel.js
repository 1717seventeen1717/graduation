const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ImageSchema = new mongoose.Schema({
    type: String,
    url: String,
    title: String
});

ImageSchema.plugin(mongoosePaginate);

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;