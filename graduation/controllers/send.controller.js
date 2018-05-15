var mongoose = require('mongoose');
var Send = require("../model/send_moduel"); //数据模型
var moment = require("moment");

//增加订单
exports.create = function(req, res, next) {
    var send = new Send(req.body); //实例化对象req.body代表post数据提交，并且参数从body中获取
    // console.log(send);
    var reg = new RegExp(/([+][^/]+)$/);
    var dateTime = moment().format();
    dateTime = dateTime.replace(/T/, ' ').replace(reg, '');
    console.log(dateTime);
    send.date = dateTime;
    // console.log(provider);
    send.save().then(function(data) {
        // console.log(data);
        res.json(data);
    });
}

// 修改订单 req.params /:id
exports.update = function(req, res, next) {
        //先找到一个id值
        const id = req.params.id;
        console.log(id);
        var reg = new RegExp(/([+][^/]+)$/);
        var dateTime = moment().format();
        dateTime = dateTime.replace(/T/, ' ').replace(reg, '');
        req.body.sendTime = dateTime;
        console.log(req.body);
        Send.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(function(data) {
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
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        // console.log(result);
        res.json(result);
    });
}

//查询包含该账号与该商品的订单
exports.listbyuserandgoods = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示30条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.goods && req.body.goods.trim().length > 0 && req.body.userName && req.body.userName.trim().length > 0 && req.body.status && req.body.status.trim().length > 0) {
        // console.log(req.body._id);
        goods = req.body.goods;
        userName = req.body.userName;
        status = req.body.status;
        //     console.log(username);
        queryCondition = {
            goods: goods,
            userName: userName,
            status: status
        };
        // console.log(queryCondition);
        Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}

//查询包含该账号中未付款的订单
exports.listbyuserandarrearage = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
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
        Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}

//根据用户名查询该用户所有账单信息
exports.listbyusername = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.userName && req.body.userName.trim().length > 0) {
        // console.log(req.body._id);
        userName = req.body.userName;
        // console.log(userName);
        queryCondition = {
            userName: userName
        };
        // console.log(queryCondition);
        Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}

//查询准备发货的订单以及属于用户名匹配的订单
exports.listbyload = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.workerName && req.body.workerName.trim().length > 0) {
        // console.log(req.body._id);
        // userName = req.body.userName;
        workerName = req.body.workerName;
        console.log(workerName);
        // console.log(userName);
        queryCondition = {
            "$or": [{ workerName: workerName }, { workerName: "暂时无人发货" }]
        }
        console.log(queryCondition);
        Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
    //  else {
    //     workerName = "暂无此人";
    //     queryCondition = {
    //         workerName: '暂时无人'
    //     }
    //     Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
    //         // console.log(result);
    //         res.json(result);
    //     });
    // }
}



//模糊查询用户
exports.listUserVague = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    // console.log(req.body.textValue);
    if (req.body.textValue && req.body.textValue.trim().length > 0) {
        textValue = req.body.textValue;
        userName = req.body.userName;
        // console.log(textValue);
        queryCondition = {
            userName: new RegExp(textValue, "i")
        };
        //     console.log(queryCondition);
        Send.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            res.json(result);
        });
    }
}




// //模糊查询供货商
// exports.listProviderVague = function(req, res, next) {
//     var page = req.body.page ? req.body.page : 1;
//     var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
//     var queryCondition = {}; //查询条件里面写查询语句
//     // console.log(page, limit);
//     // console.log(req.body.textValue);
//     if (req.body.textValue && req.body.textValue.trim().length > 0) {
//         textValue = req.body.textValue;
//         username = req.body.username;
//         // console.log(textValue);
//         queryCondition = {
//             username: new RegExp(textValue, "i")
//         };
//         //     console.log(queryCondition);
//         User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
//             res.json(result);
//         });
//     }
// }


//删除订单
exports.remove = function(req, res, next) {
    //先找到一个id值
    var id = req.params.id;
    Send.findByIdAndRemove(id, function(err, data) {
        res.json({ message: '删除成功' });
    });
}