const express = require("express");
const app = express();

// 引入路由
const userRoutes = require("./routes/user");
const studentRoutes = require("./routes/student");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// 设置相应头
app.use((req, res, next) => {
   res.set('Access-Control-Allow-Origin', '*');
   next();
});

app.use("/api/user",userRoutes);
app.use("/api/student", studentRoutes);


app.listen(3000);