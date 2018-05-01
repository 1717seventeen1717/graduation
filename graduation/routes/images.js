var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/image.controller');

router.post('/data', dataCtrl.create); //添加轮播图片
router.post('/listEverything', dataCtrl.listEverything); //查询轮播图片


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     // res.send('respond with a resource');
//     const user = new User({ name: 'lisi' });
//     user.save().then(() => console.log('数据保存成功'));
// });

module.exports = router;