var mongoose = require('mongoose');
var Check = require("../model/check_moduel"); //数据模型
var moment = require("moment");

//增加订单
exports.create = function(req, res, next) {
    var check = new Check(req.body); //实例化对象req.body代表post数据提交，并且参数从body中获取
    console.log(check);
    var reg = new RegExp(/([+][^/]+)$/);
    var dateTime = moment().format();
    dateTime = dateTime.replace(/T/, ' ').replace(reg, '');
    console.log(dateTime);
    check.date = dateTime;
    // console.log(provider);
    check.save().then(function(data) {
        // console.log(data);
        res.json(data);
    });
}

// 修改订单 req.params /:id
exports.update = function(req, res, next) {
        //先找到一个id值
        const id = req.params.id;
        var reg = new RegExp(/([+][^/]+)$/);
        var dateTime = moment().format();
        dateTime = dateTime.replace(/T/, ' ').replace(reg, '');
        req.body.date = dateTime;
        console.log(req.body);
        Check.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(function(data) {
            // data.date = dateTime;
            // console.log(data);
            res.json(data);
        });
    }
    //     //根据username修改
    // exports.updatebyuserName = function(req, res, next) {
    //     //先找到一个id值
    //     const userName = req.params.userName;
    //     Check.findOneAndUpdate(userName, { $set: req.body }, { new: false }).then(function(data) {
    //         res.json(data);
    //     });
    // }

// 查询所有数据
exports.listEverything = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    Check.paginate(queryCondition, {}, function(err, result) {
        // console.log(result);
        res.json(result);
    });
}

//查询包含该账号与该商品的订单
exports.listbyuserandgoods = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.goods && req.body.goods.trim().length > 0 && req.body.userName && req.body.userName.trim().length > 0) {
        // console.log(req.body._id);
        goods = req.body.goods;
        userName = req.body.userName;
        //     console.log(username);
        queryCondition = {
            goods: goods,
            userName: userName
        };
        // console.log(queryCondition);
        Check.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}

//查询包含该账号中未付款的订单
exports.listbyuserandarrearage = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.userName && req.body.userName.trim().length > 0) {
        // console.log(req.body._id);
        status = '未付款';
        userName = req.body.userName;
        //     console.log(username);
        queryCondition = {
            status: status,
            userName: userName
        };
        // console.log(queryCondition);
        Check.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}