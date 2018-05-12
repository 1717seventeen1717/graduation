var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/stock.controller');

router.post('/data', dataCtrl.create); //添加商品
router.put('/data/:id', dataCtrl.update); //修改商品
// router.put('/updatebyProvideName', dataCtrl.updatebyProvideName); //修改商品
// router.delete('/data/:id', dataCtrl.remove); //删除供货商
router.post('/listEverything', dataCtrl.listEverything); //查询商品数据
router.post('/listbyProvideCode', dataCtrl.listbyProvideCode); //根据商品编号查询供货商数据
router.post('/listbyGoods', dataCtrl.listbyGoods); //根据商品名称查询供货商数据
router.post('/listbyid', dataCtrl.listbyid); //根据id查询发货单数据
router.post('/listbystatus', dataCtrl.listbystatus); //查询status为2的数据
router.post('/listGoods', dataCtrl.listGoods); //根据商品名模糊查询
// router.post('/listbyProviderCode', dataCtrl.listbyProviderCode); //根据id查询供货商数据



module.exports = router;