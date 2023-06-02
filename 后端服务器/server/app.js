const express = require("express")

//引入config配置模块
const config = require("./appConfig")

// 钩子函数
const util = require("./utils/index")

//创建应用程序
const app = express()

//执行配置文件
config(app)

//注册路由
const test = require("./routes/test")
const user = require("./routes/user")
const admin = require("./routes/admin")
const upload = require("./routes/upload")
const login = require("./routes/login")
const con = require("./routes/console")
const forum = require("./routes/forum")
const remark = require("./routes/remark")
const activity = require("./routes/activity")
const noHook = require("./routes/noHook")
const knowledge = require("./routes/knowledge")
const contact = require("./routes/contact")
const consult = require("./routes/consult")

//使用路由
app.use(login)
app.use(noHook)

// 使用钩子函数
app.use(util.checkLogin,test)
app.use(util.checkLogin,user)
app.use(util.checkLogin,admin)
app.use(util.checkLogin,upload)
app.use(util.checkLogin,con)
app.use(util.checkLogin,forum)
app.use(util.checkLogin,remark)
app.use(util.checkLogin,activity)
app.use(util.checkLogin,knowledge)
app.use(util.checkLogin,contact)
app.use(util.checkLogin,consult)


// 监听端口，启动
app.listen("9999",()=>{
    console.log("服务器启动>>>>")
})