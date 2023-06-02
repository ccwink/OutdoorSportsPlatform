//钩子函数
function checkLogin(req,res,next){
    console.log('你每次执行命令，都会来我这里！')

    // 跨域访问
    res.header("Access-Control-Allow-Origin","*")

    // let utoken = req.session["utoken"]  // 获取本地utoken
    // let uauthToken = req.headers["uauthtoken"]  // 获取请求头部的信息
    
    // 在这里进行是否已经登录的判断
    let token = req.session["token"]  // 获取本地token
    let authToken = req.headers["authtoken"]  // 获取请求头部的信息
    let url = req.url  // 获取请求链接
    console.log(url)

    if(url == '/login'){  // 如果是请求登录的路径，放行
        next()
    }else if(url == '/upload'){  // 头像 放行
        next()
    }else if(authToken){  // 如果两个的token值一样的话，放行
        authToken = JSON.parse(authToken)
        if(token.code == authToken.code && token.startTime == authToken.startTime){
            next()
        }else{
            res.send({msg:"token不一致,请先登录!",code:"0055"})
        }
    // }else if(uauthToken){
    //     uauthToken = JSON.parse(uauthToken)
    //     if(utoken.code == uauthToken.code && utoken.startTime == uauthToken.startTime){
    //         next()
    //     }else{
    //         res.send({msg:"token不一致,请先登录!",code:"0055"})
    //     }
    }else{
        res.send({msg:"请先登录！",code:"0055"})
    }
}

module.exports = {
    checkLogin
}