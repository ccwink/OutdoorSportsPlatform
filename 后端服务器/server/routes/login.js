const express = require("express")
const router = express.Router()

const fs = require("fs")
const path = require("path")
const handleDB = require("../db/handleDB")


//  管理员登录
router.all("/login",(req,res)=>{
    //获取请求参数post方法
    let {username,password} = req.body
    console.log(username,password);

    //let ct = req.session["captcha"]  //获取服务端的验证码
    (async function(){
        let results = await handleDB(res,"admin","find","数据库发生错误!","username = '"+username+"' and password = '"+password+"'")
        console.log(results)
        console.log(7777)
        //把查询结果进行处理 if(results)
        if(results.length >0){
            //服务端session保存登录信息
            let startTime = new Date().getTime()
            let token = {code:"asasasasasaasa&&"+results[0].password+results[0].id, startTime:startTime}
            req.session["token"] = token
            req.session["aid"] = results[0].id  // 管理员登录时存储管理员id

            res.send({msg:"查询成功！",code:"0000",token:token})
        }else{
            res.send({msg:"查询失败！账号密码不存在",code:"0002"})
        }
    })()  
})

// 用户登录
router.all("/logins",(req,res)=>{
    //获取请求参数post方法
    let {username,password} = req.body
    console.log(username,password);

    //let ct = req.session["captcha"]  //获取服务端的验证码
    (async function(){
        let results = await handleDB(res,"user","find","数据库发生错误!","username = '"+username+"' and password = '"+password+"'")
        console.log(results)
        //把查询结果进行处理 if(results)
        if(results.length >0){

            //服务端session保存登录信息
            let startTime = new Date().getTime()
            let token = {code:"asasasasasaasa&&"+results[0].password+results[0].id, startTime:startTime}
            req.session["token"] = token
            req.session["uid"] = results[0].id  // 用户登录时存储用户id
            req.session["uname"] = results[0].username  // 用户登录时存储用户账号名
            req.session["uimg"] = results[0].user_img // 用户登录时存储用户头像
            // console.log(req.session["uid"])
            // console.log(req.session["uname"])
            // console.log(req.session["uimg"])
            // console.log(111)

            res.send({msg:"查询成功！",code:"0000",token:token})
        }else{
            res.send({msg:"查询失败！账号密码不存在",code:"0002"})
        }
    })()  
})

//注册用户
router.post("/addStu",(req,res)=>{
    console.log(req.body)

    let {username,password,user_name,user_img,user_phone,user_sex,user_content,user_power} = req.body;
    console.log(username,password,user_name,user_img,user_phone,user_sex,user_content,user_power);

    (async function(){
        let result = await handleDB(res,"user","find","数据库发生错误!","username = '"+username+"'")
        if(result.length > 0){
            res.send({msg:"用户名已存在！请重新输入！",code:"0001"})
        }else{
            let results = await handleDB(res,"user","insert","数据库发生错误!",{username:username,password:password,user_name:user_name,user_img:user_img,user_phone:user_phone,user_sex:user_sex,user_content:user_content,user_power:user_power})
            console.log(results)
    
            if(results.affectedRows == 1){
                res.send({msg:"插入成功!",code:"0000"})
            }else{
                res.send({msg:"插入失败!",code:"0007"})
            }
        }
    })()
})

// 条件查询
router.all("/getPower",(req,res)=>{
    let {username,password} = req.body
    console.log(username,password);

    (async function(){
        let result = await handleDB(res,"user","find","数据库发生错误!","username = '"+username+"' and password = '"+password+"'");
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

module.exports = router