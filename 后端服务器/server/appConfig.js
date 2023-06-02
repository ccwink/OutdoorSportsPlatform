const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const cookieParser = require("cookie-parser")
const cookieSession = require("cookie-session")
const util = require("./utils/index")
const logger = require("morgan")

let appConfig = app =>{
    //4、处理传递参数
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    //5、导入渲染模版
    //安装 npm install art-template 和 npm install express-art-template
    //1.修改模版引擎为html
    app.engine("html",require("express-art-template"))
    //2.设置运行模式为生产模式
    app.set("view options",{debug:process.env.NODE_ENV !== 'production'})
    //3.设置模版放在views 文件夹里面
    app.set("views",path.join(__dirname,'views'))
    //4.设置引擎后缀为html
    app.set("view engine","html")

    //6、导入cookie和session模块，注册到app中
    //安装 npm install cookie-parser 和 npm install cookie-session
    app.use(cookieParser())
    app.use(cookieSession({
        name:'mySession',  //给session定义名字
        keys:['123456'],  //定义key，加密随机的字符串
        maxAge:1000*60*60*24  //过期时间
    }))

    //7、导入钩子函数

    //8、静态资源的加载
    app.use(express.static("public"))

    //9、日志记录
    // 创建一个文件写入流，保存在当前文件夹的logfile.log文件中
    let logfileStream = fs.createWriteStream(path.join(__dirname,'/log/logfile.log'),{flag:'a'})
    app.use(logger(function(tokens,req,res){
        return [
            '请求方式:' + tokens.method(req,res),
            '请求路径:' + tokens.url(req,res),
            '请求状态:' + tokens.status(req,res),
            '上下文长度:' + tokens.res(req,res,'content-length'),
            '反应时间:' + tokens['response-time'](req,res) + 'ms',
            ''
        ].join('\r\n')
    },{stream: logfileStream}))
}

module.exports = appConfig