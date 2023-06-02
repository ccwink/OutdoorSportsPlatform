const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")  //sql语句

// 管理员基本信息
router.get("/getAdmin",(req,res)=>{

    let aid = req.session["aid"];  // 获取管理员id
    console.log(aid);

    (async function(){
        let result = await handleDB(res,"admin","find","数据库发生错误!","id = '"+aid+"'");
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 修改信息
router.post("/editAdmin",(req,res)=>{
    console.log(req.body)

    let {id,username,password,role} = req.body;
    // console.log(stu_name,stu_img,stu_phone,stu_sex,stu_content);

    (async function(){
        let results = await handleDB(res,"admin","update","数据库发生错误!","id="+id,{username:username,password:password,role:role})
        console.log(results)

        if(results.affectedRows == 1){
            res.send({msg:"修改成功!",code:"0000"})
        }else{
            res.send({msg:"修改失败!",code:"0007"})
        }
    })()
})
module.exports = router