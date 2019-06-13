const express = require("express");
const router = express.Router();
const studentModel = require("../model/student");

// 添加学生数据
router.post("/", (req, res) => {
  studentModel.findOne({
    studentName : req.body.studentName
  }).then(data => {
    if(!data){
      let student = new studentModel(req.body);
      student.save()
        .then(() => {
          res.send({
            code : 0,
            msg : "添加成功"
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.send({
            code : -1 ,
            msg : "添加失败"
          });
        });
    }else{
      res.send({
        code : -1,
        msg : "该学生已存在"
      });
    }
  });
});

// 模糊查询学生数据
router.get("/", (req, res) => {
  let pageSize = req.query.pageSize || 5;
  let pageNum = req.query.pageNum || 1;
  let studentName = new RegExp(req.query.studentName);
  studentModel.find({studentName}).count({},(err,nums) => {
    studentModel.find({
      studentName
    }).limit(pageSize).skip((pageNum - 1) * pageSize).then(data => {
      res.send({
        code : 0,
        msg : "查询成功",
        listed : {
          data : data,
          studentNum : Math.ceil(nums / pageSize)
        },
        pageCount : nums
      });
    })
  });
});


// 删除学生数据
router.delete("/",(req, res) => {
  studentModel.remove({
    _id : req.query._id
  },(err, data) => {
    if(err){
      console.log(err.message);
      res.send({
        code : -1,
        msg : "删除失败"
      });
      return;
    }
    res.send({
      code : 0 ,
      msg : "ok"
    });
  });
});


module.exports = router;