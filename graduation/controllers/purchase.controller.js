var mongoose = require('mongoose');
var Purchase = require("../model/purchase_moduel"); //数据模型
var moment = require("moment");

//日期格式化
// Date.prototype.format = function(fmt) {
//     var o = {
//         "M+": this.getMonth() + 1, //月份 
//         "d+": this.getDate(), //日 
//         "h+": this.getHours(), //小时 
//         "m+": this.getMinutes(), //分 
//         "s+": this.getSeconds(), //秒 
//         "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
//         "S": this.getMilliseconds() //毫秒 
//     };
//     if (/(y+)/.test(fmt)) {
//         fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
//     }
//     for (var k in o) {
//         if (new RegExp("(" + k + ")").test(fmt)) {
//             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
//         }
//     }
//     return fmt;
// }



//增加商品
exports.create = function(req, res, next) {
    var purchase = new Purchase(req.body); //实例化对象req.body代表post数据提交，并且参数从body中获取
    console.log(purchase);
    var reg = new RegExp(/([+][^/]+)$/);
    var dateTime = moment().format();
    dateTime = dateTime.replace(/T/, ' ').replace(reg, '');
    console.log(dateTime);
    purchase.date = dateTime;
    // console.log(provider);
    purchase.save().then(function(data) {
        // console.log(data);
        res.json(data);
    });
}

// 删除采购单
exports.remove = function(req, res, next) {
    //先找到一个id值
    var id = req.params.id;
    Purchase.findByIdAndRemove(id, function(err, data) {
        res.json({ message: '删除成功' });
    });
}

// 修改商品 req.params /:id
exports.update = function(req, res, next) {
    //先找到一个id值
    const id = req.params.id;
    Purchase.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(function(data) {
        res.json(data);
    });
}

//查询供应商
// exports.list = function(req, res, next) {
//     var page = req.body.page ? req.body.page : 1;
//     var limit = req.body.limit ? req.body.limit : 3; //一页显示3条
//     var queryCondition = {}; //查询条件里面写查询语句
//     // console.log(page, limit);
//     if (req.body.username && req.body.username.trim().length > 0) {
//         username = req.body.username;
//         //     console.log(username);
//         queryCondition = {
//             username: new RegExp(username, "i")
//         };
//         //     console.log(queryCondition);
//         User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
//             res.json(result);
//         });
//     }
// }



// 查询所有数据
exports.listEverything = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    Purchase.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        // console.log(result);
        res.json(result);
    });
}


// 根据商品编号查询供货商所有信息
exports.listbyProvideCode = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.provideCode && req.body.provideCode.trim().length > 0) {
        // console.log(req.body._id);
        // console.log(req.body.provideCode);

        provideCode = req.body.provideCode;
        //     console.log(username);
        queryCondition = {
            provideCode: provideCode
        };
        // console.log(queryCondition);
        Purchase.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}

//模糊商品名
exports.listGoods = function(req, res, next) {
        var page = req.body.page ? req.body.page : 1;
        var limit = req.body.limit ? req.body.limit : 300; //一页显示3条
        var queryCondition = {}; //查询条件里面写查询语句
        // console.log(page, limit);
        // console.log(req.body.textValue);
        if (req.body.textValue && req.body.textValue.trim().length > 0) {
            textValue = req.body.textValue;
            goods = req.body.goods;
            // console.log(textValue);
            queryCondition = {
                goods: new RegExp(textValue, "i")
            };
            //     console.log(queryCondition);
            Purchase.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
                res.json(result);
            });
        }
    }
    //根据供货商编号查询属于该供货商的所有物品

// exports.listbyProviderCode = function(req, res, next) {
//     var page = req.body.page ? req.body.page : 1;
//     var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
//     var queryCondition = {}; //查询条件里面写查询语句
//     // console.log(page, limit);
//     if (req.body.providerCode && req.body.providerCode.trim().length > 0) {
//         // console.log(req.body._id);
//         providerCode = req.body.providerCode;
//         //     console.log(username);
//         queryCondition = {
//             providerCode: providerCode
//         };
//         // console.log(queryCondition);
//         Provider.paginate(queryCondition, {}, function(err, result) {
//             // console.log(result);
//             res.json(result);
//         });
//     }
// }