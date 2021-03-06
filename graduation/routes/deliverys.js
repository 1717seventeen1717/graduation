var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/delivery.controller');

router.post('/data', dataCtrl.create); //添加收货单
router.put('/data/:id', dataCtrl.update); //修改收货单
router.delete('/data/:id', dataCtrl.remove); //删除收货单
router.post('/listEverything', dataCtrl.listEverything); //查询收货单数据
router.post('/listbyProvideCode', dataCtrl.listbyProvideCode); //根据商品编号查询供货商数据
router.post('/listbyid', dataCtrl.listbyid); //根据id查询发货单数据
router.post('/listbystatus', dataCtrl.listbystatus); //查询status为2的数据
router.post('/listGoods', dataCtrl.listGoods); //根据商品名模糊查询
// router.post('/listbyProviderCode', dataCtrl.listbyProviderCode); //根据id查询供货商数据



module.exports = router;