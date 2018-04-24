var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');

router.post('/data', dataCtrl.create); //添加用户
router.put('/data/:id', dataCtrl.update); //修改用户
router.delete('/data/:id', dataCtrl.remove); //删除用户
router.post('/list', dataCtrl.list); //查询用户
router.post('/listsomething', dataCtrl.listsomthing); //查询用户以及密码
router.post('/listEverything', dataCtrl.listEverything); //查询所有用户数据


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     // res.send('respond with a resource');
//     const user = new User({ name: 'lisi' });
//     user.save().then(() => console.log('数据保存成功'));
// });

module.exports = router;