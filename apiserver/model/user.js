// 引入之前连接数据库的模板
const db = require("../config/db");

// 设计 schema
const schema = db.Schema({
   username : {
      type : String,
      required : true
   },
   password : {
      type : String,
      required : true
   },
   avatar : {
      type : String,
      default : "http://127.0.0.1:3000/img/1.png"
   },
   sex : {
      type : Number,
      default : 1
   },
   age : {
      type : Number,
      default : 18
   }
});


// 暴露model
module.exports = db.model("user",schema);