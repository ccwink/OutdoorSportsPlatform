const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")  //sql语句

//分页查询
router.get("/getUsers",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数
    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    // 搜索
    if(req.query.query)pageObj.where +=" and username like '%"+req.query.query+"%' ";
    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    if(req.query.query)countObj +=" and username like '%"+req.query.query+"%' ";
    (async function(){
        //分页查询语句
        let results = await handleDB(res,"user","limit","数据库发生错误!",pageObj);
        //查询总条数
        let cn = await handleDB(res,"user","find","数据库发生错误!",countObj);
        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})

//新增用户
const db = require("../db/node_orm/index");
router.post("/addUser",(req,res)=>{
    //console.log(req.body)
    let {username,password,user_name,user_img,user_phone,user_sex,user_content} = req.body;
    //console.log(username,password,user_name,user_img,user_phone,user_sex,user_content);

    let User = db.model("user");  // 对应的是表格的名称
    User.sql("insert into user (username,password,user_name,user_img,user_phone,user_sex,user_content) values ('"+username+"','"+password+"','"+user_name+"','"+user_img+"','"+user_phone+"','"+user_sex+"','"+user_content+"')",(error,results)=>{
        console.log(789)
        console.log(results)
        res.send({msg:"插入成功!",code:"0000"})
    })
})

// 修改信息
router.post("/editUser",(req,res)=>{
    //console.log(req.body)
    let {id,username,password,user_name,user_img,user_phone,user_sex,user_content} = req.body;
    // console.log(user_name,user_img,user_phone,user_sex,user_content);
    (async function(){
        let results = await handleDB(res,"user","update","数据库发生错误!","id="+id,{username:username,password:password,user_name:user_name,user_img:user_img,user_phone:user_phone,user_sex:user_sex,user_content:user_content})
        //console.log(results)
        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})

//删除用户
router.delete("/deleteUser/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"user","delete","数据库发生错误!",del)
        //console.log(results)
        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})

// 条件查询
router.get("/getMydata",(req,res)=>{

    let uid = req.session["uid"];
    console.log(uid);

    (async function(){
        let result = await handleDB(res,"user","find","数据库发生错误!","id = '"+uid+"'");
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 修改权限码
router.post("/editPower",(req,res)=>{
    console.log(req.body)
    let {id,user_power} = req.body;
    console.log(id,user_power);

    (async function(){
        let results = await handleDB(res,"user","update","数据库发生错误!","id="+id,{user_power})
        //console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000",user_power:user_power})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})
module.exports = router