const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

// 户外活动
//分页查询
router.get("/getActivitys",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";

    // 搜索
    if(req.query.query)pageObj.where +=" and activity_name like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and activity_name like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"activity","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"activity","find","数据库发生错误!",countObj);
        //console.log(cn.length)

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
router.post("/addActivity",(req,res)=>{
    console.log(req.body)

    let {activity_name,activity_content,activity_text,activity_types,activity_img,activity_state,activity_star,activity_price} = req.body;

    let Activity = db.model("activity");  // 对应的是表格的名称
    Activity.sql("insert into activity (activity_name,activity_content,activity_text,activity_types,activity_img,activity_state,activity_star,activity_price) values ('"+activity_name+"','"+activity_content+"','"+activity_text+"','"+activity_types+"','"+activity_img+"','"+activity_state+"','"+activity_star+"','"+activity_price+"')",(error,results)=>{
        // console.log(error)
        console.log(55555)
        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })

    // (async function(){
    //     let results = await handleDB(res,"activity","insert","数据库发生错误!",{activity_name,activity_content,activity_star,activity_text,activity_types,activity_img,activity_state})
    //     console.log(results)

    //     if(results.affectedRows == 1){
    //         res.send({msg:"插入成功!",code:"0000"})
    //     }else{
    //         res.send({msg:"插入失败!",code:"0007"})
    //     }
    // })()
})
// 修改用户
router.post("/editActivity",(req,res)=>{
    console.log(req.body)

    let {id,activity_name,activity_content,activity_star,activity_text,activity_types,activity_img,activity_state,activity_price} = req.body;

    (async function(){
        let results = await handleDB(res,"activity","update","数据库发生错误!","id="+id,{activity_name,activity_content,activity_star,activity_text,activity_types,activity_img,activity_state,activity_price})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})
//删除用户
router.delete("/deleteActivity/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"activity","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})

// 修改状态码
router.post("/editActivityState",(req,res)=>{
    console.log(req.body)
    let {id,activity_state} = req.body;
    console.log(id,activity_state);

    (async function(){
        let results = await handleDB(res,"activity","update","数据库发生错误!","id="+id,{activity_state})
        //console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000",activity_state:activity_state})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})


module.exports = router