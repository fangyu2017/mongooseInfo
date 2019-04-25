const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
const port = process.env.PORT || 5000
const db = require('./config/keys').mongoURI
const users = require('./routes/api/User')

//链接数据库
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('数据库已连接')
  })
  .catch(err => 
    console.log(err)
  )
 app.use(bodyparser.urlencoded({extended: false}))
 app.use(bodyparser.json()) 
// 使用router
app.use('/api/users', users)

// 使用passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)
//监听数据接口
app.listen(port, () => {
  console.log(`server is running ${port}`);
})