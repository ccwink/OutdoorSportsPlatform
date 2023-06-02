const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")


// 测试


router.post("/getParser",(req,res)=>{
    res.send(req.body)
    console.log(req.body)
})

router.get("/getMoban",(req,res)=>{
    res.render('index',{abc:"111"})
})

router.get("/getSession",(req,res)=>{
    let token = req.session["token"]
    console.log(token)
    res.render('login',{token})
})

//分页查询
router.get("/getStudent",(req,res)=>{
    //console.log(req.query);  //page 页数，limit 条数

    //需要的参数格式: {where:"id>2",number:2,count:2}
    //分页查询条件
    pageObj = {}
    pageObj.number = req.query.page
    pageObj.count = req.query.limit
    pageObj.where = " 1=1 "

    //if(req.query.username)pageObj.where +=" and username='"+req.query.username+"' "

    //查询总条数条件
    let countObj = " 1=1 ";  //select * from where 1=1; 真的条件，可以加上where 关键字

    (async function(){
        //分页查询语句
        let results = await handleDB(res,"user","limit","数据库发生错误!",pageObj)

        //查询总条数
        let cn = await handleDB(res,"user","find","数据库发生错误!",countObj)
        //console.log(cn.length)

        let obj = {}
        obj.code = "0"
        obj.count = cn.length //总条数
        obj.msg = "查询成功"
        obj.data = results
        res.send(obj)
    })()
})

// 插入
router.post("/addStudents",(req,res)=>{
    console.log(req.body)

    let {stu_name,stu_img,stu_phone,stu_sex,stu_content} = req.body
    console.log(stu_name,stu_img,stu_phone,stu_sex,stu_content);

    (async function(){
        let results = await handleDB(res,"user","insert","数据库发生错误!",{stu_name:stu_name,stu_img:stu_img,stu_phone:stu_phone,stu_sex:stu_sex,stu_content:stu_content})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })()
})


module.exports = router
