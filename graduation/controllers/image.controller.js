var mongoose = require('mongoose');
var Image = require("../model/image_moduel"); //数据模型
//增加轮播图
exports.create = function(req, res, next) {
    var image = new Image(req.body); //实例化对象req.body代表post数据提交，并且参数从body中获取
    image.save().then(function(data) {
        res.json(data);
    });
}


//查询所有数据
exports.listEverything = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    Image.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        // console.log(result);
        res.json(result);
    });
}