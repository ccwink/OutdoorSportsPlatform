const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

//分页查询 信息反馈
router.get("/getcontacts",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 ";

    // 搜索
    if(req.query.query)pageObj.where +=" and contact_title like '%"+req.query.query+"%' ";

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字
    
    if(req.query.query)countObj +=" and contact_title like '%"+req.query.query+"%' ";

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"contact","limit","数据库发生错误!",pageObj);

        //查询总条数
        let cn = await handleDB(res,"contact","find","数据库发生错误!",countObj);
        //console.log(cn.length)

        let obj = {}
        obj.code = "0000"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})

//删除用户
router.delete("/deleteContact/:id",(req,res)=>{
    let {id} = req.params 
    let del = " id="+id;
    (async function(){
        let results = await handleDB(res,"contact","delete","数据库发生错误!",del)
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"删除成功!",code:"0000"})
        }else{
            res.send({msg:"删除失败!",code:"0007"})
        }
    })()
})


module.exports = router