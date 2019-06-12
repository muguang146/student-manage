// 引入mongoose
const mongoose = require("mongoose");
// 地址
const url = "mongodb://localhost:27017/1904";
// 连接数据库
mongoose.connect(url, { useNewUrlParser : true })
   .then(() => {
      console.log("连接数据库成功");
   })
   .catch((err) => {
      console.log(err.message)
      console.log("连接数据库失败")
   });

// 暴露 mongoose
module.exports = mongoose;