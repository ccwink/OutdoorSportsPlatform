const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

//分页查询
router.get("/getForums",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";
    pageObj.where += "order by id desc";

    // 搜索
    if(req.query.query)pageObj.where +=" and forum_title like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and forum_title like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"forum","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"forum","find","数据库发生错误!",countObj);
        //console.log(cn.length)

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})

//新增 管理员
router.post("/addForum",(req,res)=>{
    console.log(req.body)

    let {forum_title,forum_content,forum_user_id,forum_user_name,forum_user_img} = req.body;

    (async function(){
        let results = await handleDB(res,"forum","insert","数据库发生错误!",{forum_title,forum_content,forum_user_id,forum_user_name,forum_user_img})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })()
})

//用户提问
const db = require("../db/node_orm/index");
router.post("/addForumUser",(req,res)=>{
    console.log(req.body)

    let {forum_title,forum_content,forum_state} = req.body;
    let forum_user_id = req.session["uid"];
    let forum_user_name = req.session["uname"];
    let forum_user_img = req.session["uimg"];

    let quiz = db.model("forum");
    quiz.sql("insert into forum (forum_title,forum_content,forum_state,forum_user_id,forum_user_name,forum_user_img) values ('"+forum_title+"','"+forum_content+"','"+forum_state+"','"+forum_user_id+"','"+forum_user_name+"','"+forum_user_img+"')",(error,results)=>{
        console.log(error)
        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })

    // (async function(){
    //     let results = await handleDB(res,"forum","insert","数据库发生错误!",{forum_title,forum_content,forum_user_id,forum_user_name})
    //     console.log(results)

    //     if(results.affectedRows == 1){
    //         res.send({msg:"插入成功!",code:"0000"})
    //     }else{
    //         res.send({msg:"插入失败!",code:"0007"})
    //     }
    // })()
})

// 修改
router.post("/editForum",(req,res)=>{
    console.log(req.body)

    let {id,forum_title,forum_content,forum_user_id,forum_user_name,forum_user_img} = req.body;
    // console.log(forum_name,forum_img,forum_phone,forum_sex,forum_content);

    (async function(){
        let results = await handleDB(res,"forum","update","数据库发生错误!","id="+id,{forum_title,forum_content,forum_user_id,forum_user_name,forum_user_img})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})

//删除
router.delete("/deleteForum/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"forum","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})

// 审核
router.post("/editForumState",(req,res)=>{
    console.log(req.body)
    let {id,forum_state} = req.body;
    console.log(id,forum_state);

    (async function(){
        let results = await handleDB(res,"forum","update","数据库发生错误!","id="+id,{forum_state})
        console.log(results)
        console.log(2222)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000",forum_state:forum_state})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})

// 条件查询 个人
router.get("/getForum3",(req,res)=>{

    let uid = req.session["uid"]
    pageObj = {}
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";
    pageObj.where +=" and forum_user_id = '"+uid+"' ";

    if(req.query.query)pageObj.where +=" and forum_title like '%"+req.query.query+"%' "; // 模糊查询

    let countObj = "forum_user_id = '"+uid+"' ";
    if(req.query.query)countObj +=" and forum_title like '%"+req.query.query+"%' ";

    (async function(){
        let result = await handleDB(res,"forum","limit","数据库发生错误!",pageObj);
        // console.log(result)
        let cn = await handleDB(res,"forum","find","数据库发生错误!",countObj);

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

module.exports = router