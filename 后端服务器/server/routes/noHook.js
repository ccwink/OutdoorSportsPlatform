const express = require("express")
const router = express.Router()
const handleDB =require("../db/handleDB")

// 条件查询 户外活动
router.get("/activityData/:id",(req,res)=>{
    let {id} = req.params;
    console.log(req.params);
    (async function(){
        let result = await handleDB(res,"activity","find","数据库发生错误!","id="+id);
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 条件查询 户外活动 home
router.get("/getActivity",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"activity","find","数据库发生错误!","activity_state='1'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 户外活动 activity2
router.get("/getActivitysList",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"activity","find","数据库发生错误!","activity_state='1'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 条件查询 问答点评
router.get("/getForum",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"forum","find","数据库发生错误!","forum_state='1'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 条件查询
router.get("/getForum2",(req,res)=>{

    pageObj = {}
    pageObj.number = req.query.page;
    pageObj.count = req.query.limit;
    pageObj.where = " 1=1 ";
    pageObj.where +=" and forum_state='1'";

    if(req.query.query)pageObj.where +=" and forum_title like '%"+req.query.query+"%' "; // 模糊查询

    let countObj = "forum_state='1'";
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

// 通过id 获取问题信息
router.get("/forumData/:id",(req,res)=>{
    let {id} = req.params;
    console.log(req.params);
    (async function(){
        let result = await handleDB(res,"forum","find","数据库发生错误!","id="+id);
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 通过id 获取用户信息
router.get("/userData/:uid",(req,res)=>{
    let {uid} = req.params;
    console.log(req.params);
    (async function(){
        let result = await handleDB(res,"user","find","数据库发生错误!","id="+uid);
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 通过id 获取评论信息
router.get("/remarkData/:id",(req,res)=>{
    let {id} = req.params;
    console.log(req.params);
    (async function(){
        let result = await handleDB(res,"remark","find","数据库发生错误!","remark_forum_id="+id);
        console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 获取知识中心大列表
router.get("/getKnowledgesList",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_state!='下架'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 条件查询 home知识头条 头条
router.get("/getKnowledgeTop",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_state='头条'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 条件查询 home知识 小列表
router.get("/getKnowledgeList",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_state='列表'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

// 条件查询 知识
router.get("/knowledgeData/:id",(req,res)=>{
    let {id} = req.params;
    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","id="+id);
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 徒步列表
router.get("/getKnowledge2tubu",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_types='徒步'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 跑步列表
router.get("/getKnowledge2paobu",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_types='跑步'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 安全急救列表
router.get("/getKnowledge2jijiu",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_types='急救'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 骑行列表
router.get("/getKnowledge2qixing",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_types='骑行'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})
// 露营列表
router.get("/getKnowledge2luying",(req,res)=>{

    (async function(){
        let result = await handleDB(res,"knowledge","find","数据库发生错误!","klg_types='露营'");
        // console.log(result)
    
        let obj = {}
        obj.code = "0000"
        obj.msg = "查询成功"
        obj.data = result
        res.send(obj)
    })()
})

//新增联系
router.post("/addContact",(req,res)=>{
    console.log(req.body)

    let {contact_title,contact_content} = req.body;

    (async function(){
        let results = await handleDB(res,"contact","insert","数据库发生错误!",{contact_title,contact_content})
        console.log(results)
        if(results.affectedRows == 1){
            res.send({msg:"插入成功!",code:"0000"})
        }else{
            res.send({msg:"插入失败!",code:"0007"})
        }
    })()
})

module.exports = router