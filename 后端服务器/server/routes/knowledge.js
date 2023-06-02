const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

// 户外知识
//分页查询
router.get("/getknowledges",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";

    // 搜索
    if(req.query.query)pageObj.where +=" and klg_title like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and klg_title like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"knowledge","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"knowledge","find","数据库发生错误!",countObj);
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
router.post("/addKnowledge",(req,res)=>{
    console.log(req.body)

    let {klg_img,klg_title,klg_content,klg_time,klg_types,klg_state} = req.body;
    console.log(klg_img,klg_title,klg_content,klg_time,klg_types,klg_state);

    let klg = db.model("knowledge");  // 对应的是表格的名称
    klg.sql("insert into knowledge (klg_img,klg_title,klg_content,klg_time,klg_types,klg_state) values ('"+klg_img+"','"+klg_title+"','"+klg_content+"','"+klg_time+"','"+klg_types+"','"+klg_state+"')",(error,results)=>{
        console.log(results)
        console.log(55555)
        res.send({msg:"插入成功!",code:"0000"})
    })

    // (async function(){
    //     let results = await handleDB(res,"knowledge","insert","数据库发生错误!",{klg_title,klg_content})
    //     console.log(results)

    //     if(results.affectedRows == 1){
    //         res.send({msg:"插入成功!",code:"0000"})
    //     }else{
    //         res.send({msg:"插入失败!",code:"0007"})
    //     }
    // })()
})
// 修改信息
router.post("/editKnowledge",(req,res)=>{
    console.log(req.body)

    let {id,klg_img,klg_title,klg_time,klg_types,klg_content,klg_state} = req.body;

    (async function(){
        let results = await handleDB(res,"knowledge","update","数据库发生错误!","id="+id,{klg_img,klg_title,klg_time,klg_types,klg_content,klg_state})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})
// 发布
router.post("/editState",(req,res)=>{
    console.log(req.body)

    let {id,klg_state} = req.body;

    (async function(){
        let results = await handleDB(res,"knowledge","update","数据库发生错误!","id="+id,{klg_state})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})

//删除用户
router.delete("/deleteKnowledge/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"knowledge","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})


module.exports = router