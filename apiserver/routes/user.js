// 引入工具
const express = require("express");
const routes = express.Router();
const userModel = require("../model/user");
const bcrypt = require("bcrypt");



// 注册
routes.post("/reg", (req, res) => {
   // 查询验证
   userModel.findOne({
      username : req.body.username
   })
      .then((data) => {
         if(data){
            res.send({
               code : -1,
               msg : "用户已存在"
            });
         }else{
            // 加密
            let hashPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashPassword;
            let user = new userModel(req.body);
            user.save()
               .then(() => {
                  res.send({
                     code : 0,
                     msg : "注册成功"
                  });
               })
               .catch(err => {
                  res.send({
                     code : -1,
                     msg : "数据异常"
                  });
               });
         }
      });
});


// 登录
routes.post("/login", (req, res) => {
      userModel.findOne({
            username : req.body.username
      }).then(data => {
            if(data){
                  let isOk = bcrypt.compareSync(req.body.password,data.password);
                  if(isOk){
                        res.send({
                              code : 0,
                              msg : "登录成功",
                              username : req.body.username
                        });

                  }else{
                        res.send({
                              code : -1,
                              msg : "账号密码错误"
                        });
                  }
            }else{
                  res.send({
                        code : -1,
                        msg : "账号密码错误"
                  });
            }
      });
});


module.exports = routes;