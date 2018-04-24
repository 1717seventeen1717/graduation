var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// const Cat = mongoose.model('Cat', { name: String, gender: String });

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    // const kitty = new Cat({ name: 'cat', gender: 'male' });
    // kitty.save().then(() => console.log('meow'));
});

module.exports = router;