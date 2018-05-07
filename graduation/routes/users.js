var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/user.controller');

router.post('/data', dataCtrl.create); //添加用户
router.put('/data/:id', dataCtrl.update); //修改用户
router.delete('/data/:id', dataCtrl.remove); //删除用户
router.post('/list', dataCtrl.list); //查询用户
router.post('/listsomething', dataCtrl.listsomthing); //查询用户以及密码
router.post('/listEverything', dataCtrl.listEverything); //查询所有用户数据
router.post('/listUserVague', dataCtrl.listUserVague); //模糊查询用户数据
router.post('/listbyid', dataCtrl.listbyid); //根据id查询用户数据
router.post('/listbyusername', dataCtrl.listbyusername); //根据用户名查询用户数据


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     // res.send('respond with a resource');
//     const user = new User({ name: 'lisi' });
//     user.save().then(() => console.log('数据保存成功'));
// });

module.exports = router;