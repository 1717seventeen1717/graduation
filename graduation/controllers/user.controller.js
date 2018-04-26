var mongoose = require('mongoose');
var User = require("../model/user_moduel"); //数据模型
//增加用户
exports.create = function(req, res, next) {
    var user = new User(req.body); //实例化对象req.body代表post数据提交，并且参数从body中获取
    user.save().then(function(data) {
        res.json(data);
    });
}

//删除用户
exports.remove = function(req, res, next) {
    //先找到一个id值
    var id = req.params.id;
    User.findByIdAndRemove(id, function(err, data) {
        res.json({ message: '删除成功' });
    });
}



//修改用户 req.params /:id
exports.update = function(req, res, next) {
    //先找到一个id值
    const id = req.params.id;
    User.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(function(data) {
        res.json(data);
    });
}

//查询用户
exports.list = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 3; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.username && req.body.username.trim().length > 0) {
        username = req.body.username;
        //     console.log(username);
        queryCondition = {
            username: new RegExp(username, "i")
        };
        //     console.log(queryCondition);
        User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            res.json(result);
        });
    }
}


//模糊查询用户
exports.listUserVague = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 10; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    // console.log(req.body.textValue);
    if (req.body.textValue && req.body.textValue.trim().length > 0) {
        textValue = req.body.textValue;
        username = req.body.username;
        // console.log(textValue);
        queryCondition = {
            username: new RegExp(textValue, "i")
        };
        //     console.log(queryCondition);
        User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            res.json(result);
        });
    }
}





//查询所有数据
exports.listEverything = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 30; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        // console.log(result);
        res.json(result);
    });
}


//查询用户名和密码以及用户类型
exports.listsomthing = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 3; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body.username && req.body.username.trim().length > 0 && req.body.password && req.body.password.trim().length > 0) {
        username = req.body.username;
        password = req.body.password;
        // type = req.body.type;
        console.log(username, password);
        queryCondition = {
            username: username,
            password: password,
            // type: type
        };
        //     console.log(queryCondition);
        User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            res.json(result);
        });
    }
}

//根据id查询用户所有信息
exports.listbyid = function(req, res, next) {
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 3; //一页显示3条
    var queryCondition = {}; //查询条件里面写查询语句
    // console.log(page, limit);
    if (req.body._id && req.body._id.trim().length > 0) {
        // console.log(req.body._id);
        id = req.body._id;
        //     console.log(username);
        queryCondition = {
            _id: id
        };
        // console.log(queryCondition);
        User.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
            // console.log(result);
            res.json(result);
        });
    }
}