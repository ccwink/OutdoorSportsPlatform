const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

// 咨询活动
//分页查询
router.get("/getConsults",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";
    pageObj.where += "order by id desc";

    // 搜索
    if(req.query.query)pageObj.where +=" and consult_activity_name like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and consult_activity_name like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"consult","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"consult","find","数据库发生错误!",countObj);
        //console.log(cn.length)

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})
// 个人中心条件查询
router.get("/getConsult",(req,res)=>{
    let uid = req.session["uid"];
    console.log(uid)
    console.log(2222)
    pageObj = {}
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";
    pageObj.where +=" and consult_user_id ='"+uid+"' ";

    if(req.query.query)pageObj.where +=" and consult_activity_name like '%"+req.query.query+"%' ";

    let countObj = " consult_user_id ='"+uid+"' ";
    if(req.query.query)countObj +=" and consult_activity_name like '%"+req.query.query+"%' ";

    (async function(){
        let result = await handleDB(res,"consult","limit","数据库发生错误!",pageObj);
        // console.log(result)
        let cn = await handleDB(res,"consult","find","数据库发生错误!",countObj);

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

//新增活动咨询
router.post("/addConsult",(req,res)=>{
    console.log(req.body)

    let {consult_activity_name,consult_activity_time,consult_user_phone,consult_remark} = req.body;
    let consult_user_id = req.session["uid"];

    (async function(){
        let results = await handleDB(res,"consult","insert","数据库发生错误!",{consult_activity_name,consult_activity_time,consult_user_phone,consult_remark,consult_user_id})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })()
})
// 修改用户
router.post("/editConsult",(req,res)=>{
    console.log(req.body)

    let {id,consult_activity_name,consult_activity_time,consult_user_phone,consult_remark,consult_user_id} = req.body;

    (async function(){
        let results = await handleDB(res,"consult","update","数据库发生错误!","id="+id,{consult_activity_name,consult_activity_time,consult_user_phone,consult_remark,consult_user_id})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})
//删除用户
router.delete("/deleteConsult/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"consult","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})

// 修改状态码
router.post("/editConsultState",(req,res)=>{
    console.log(req.body)
    let {id,consult_state} = req.body;
    console.log(id,consult_state);

    (async function(){
        let results = await handleDB(res,"consult","update","数据库发生错误!","id="+id,{consult_state})
        //console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000",consult_state:consult_state})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})


module.exports = router