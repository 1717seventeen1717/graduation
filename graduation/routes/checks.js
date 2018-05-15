var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/check.controller');

router.post('/data', dataCtrl.create); //添加商品
router.put('/data/:id', dataCtrl.update); //修改订单数据
router.put('/dataonly/:id', dataCtrl.updateonly); //修改订单数据
// router.put('/data/:userName', dataCtrl.update); //修改订单数据
router.delete('/data/:id', dataCtrl.remove); //删除订单
router.post('/listEverything', dataCtrl.listEverything); //查询订单数据
router.post('/listbyuserandgoods', dataCtrl.listbyuserandgoods); //根据用户名和商品名查询
router.post('/listbyuserandarrearage', dataCtrl.listbyuserandarrearage); //查询包含该账号中未付款的订单
// router.post('/listbyProvideCode', dataCtrl.listbyProvideCode); //根据商品编号查询供货商数据
// router.post('/listbyProviderCode', dataCtrl.listbyProviderCode); //根据id查询供货商数据
router.post('/listbyusername', dataCtrl.listbyusername); //根据用户名查询该用户账单数据
router.post('/listUserVague', dataCtrl.listUserVague); //模糊查询用户数据






module.exports = router;