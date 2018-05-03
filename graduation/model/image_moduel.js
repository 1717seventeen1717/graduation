const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var ImageSchema = new mongoose.Schema({
    type: String,
    url: String,
    title: String,
    title2: String,
    title3: String,
});

ImageSchema.plugin(mongoosePaginate);

var Image = mongoose.model('Image', ImageSchema);

module.exports = Image;