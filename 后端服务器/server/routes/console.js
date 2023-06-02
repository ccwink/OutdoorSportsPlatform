const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

//问题待审核数量
router.get("/getConsoleForum",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"forum","find","数据库发生错误!","forum_state='0'")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//用户总数
router.get("/getConsoleUser",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"user","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//户外知识数量
router.get("/getConsoleKnowledge",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"knowledge","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//问题数量
router.get("/getConsoleForums",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"forum","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//点评数量
router.get("/getConsoleRemark",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"remark","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//活动数量
router.get("/getConsoleActivity",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"activity","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//咨询数量
router.get("/getConsoleConsult",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"consult","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})
//信息反馈数量
router.get("/getConsoleContact",(req,res)=>{

    (async function(){
        //查询总条数
        let count = await handleDB(res,"contact","find","数据库发生错误!")

        let obj = {}
        obj.code = "0000"
        obj.count = count.length //总条数
        obj.msg = "查询成功"
        res.send(obj)
    })()
})

module.exports = router