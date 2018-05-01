var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/provider.controller');

router.post('/data', dataCtrl.create); //添加供货商
router.put('/data/:id', dataCtrl.update); //修改供货商
router.delete('/data/:id', dataCtrl.remove); //删除供货商
router.post('/listEverything', dataCtrl.listEverything); //查询所有供货商数据
router.post('/listbyid', dataCtrl.listbyid); //根据id查询供货商数据
router.post('/listbyProviderCode', dataCtrl.listbyProviderCode); //根据id查询供货商数据



module.exports = router;