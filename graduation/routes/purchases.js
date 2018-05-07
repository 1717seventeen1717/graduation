var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/purchase.controller');

router.post('/data', dataCtrl.create); //添加商品
router.put('/data/:id', dataCtrl.update); //修改商品
router.delete('/data/:id', dataCtrl.remove); //删除采购单
router.post('/listEverything', dataCtrl.listEverything); //查询商品数据
router.post('/listbyProvideCode', dataCtrl.listbyProvideCode); //根据商品编号查询供货商数据
// router.post('/listbyProviderCode', dataCtrl.listbyProviderCode); //根据id查询供货商数据



module.exports = router;