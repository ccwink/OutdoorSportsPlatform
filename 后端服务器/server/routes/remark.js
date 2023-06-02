const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

//分页查询
router.get("/getRemarks",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";

    // 搜索
    if(req.query.query)pageObj.where +=" and remark_user_name like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and remark_user_name like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"remark","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"remark","find","数据库发生错误!",countObj);
        //console.log(cn.length)

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})

//新增
const db = require("../db/node_orm/index");
router.post("/addRemark",(req,res)=>{
    console.log(req.body)

    let {remark_content,remark_forum_id} = req.body;
    let remark_user_id = req.session["uid"];
    let remark_user_name = req.session["uname"];
    let remark_user_img = req.session["uimg"];

    let remark = db.model("remark");
    remark.sql("insert into remark (remark_content,remark_forum_id,remark_user_id,remark_user_name,remark_user_img) values ('"+remark_content+"','"+remark_forum_id+"','"+remark_user_id+"','"+remark_user_name+"','"+remark_user_img+"')",(error,results)=>{
        console.log(error)
        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })

    // (async function(){
    //     let results = await handleDB(res,"remark","insert","数据库发生错误!",{remark_content,remark_user_id,remark_forum_id,remark_user_name,remark_user_img})
    //     console.log(results)

    //     if(results.affectedRows == 1){
    //         res.send({msg:"插入成功!",code:"0000"})
    //     }else{
    //         res.send({msg:"插入失败!",code:"0007"})
    //     }
    // })()
})
// 修改
router.post("/editRemark",(req,res)=>{
    console.log(req.body)

    let {id,remark_content,remark_user_id,remark_forum_id,remark_user_name,remark_user_img} = req.body;

    (async function(){
        let results = await handleDB(res,"remark","update","数据库发生错误!","id="+id,{remark_content,remark_user_id,remark_forum_id,remark_user_name,remark_user_img})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})

//删除
router.delete("/deleteRemark/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"remark","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})


module.exports = router