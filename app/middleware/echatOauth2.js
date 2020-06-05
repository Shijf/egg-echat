'use strict';


module.exports = (options, app) => {
    console.log('感谢您使用echat插件，本插件主要用于eggjs接入私有化部署的企业微信，详细使用文档：http://www.baidu.com');

    return async function (ctx, next) {
        //     //判断是否已经登录
        const isEchatAuth = await ctx.service.echatAuth.check();
        
        if (!isEchatAuth) {
            const oauth2 = await ctx.echat().oauth2();
            const code = ctx.query.code;            
            if (!code) {
                ctx.unsafeRedirect(await oauth2.redirectUrl());
                return;
            }

            function isDetail() {
                let scope = (ctx.app.config.echat.Agent.oauth.hasOwnProperty('scopes') ? ctx.app.config.echat.Agent.oauth.scopes : null) ;
                return scope === 'snsapi_base' ? false : true;
            }

            let userInfo = await oauth2.getUserInfo(code, isDetail());
            //删除干扰信息
            delete userInfo.errcode;
            delete userInfo.errmsg;
            delete userInfo.user_ticket;
            delete userInfo.expires_in;            
            //存入session
            ctx.session.echat = {
                userid: userInfo.userid,
                name: userInfo.name,
                deviceId: userInfo.DeviceId,
                usertype: userInfo.usertype,
                test: userInfo.test,
                gender: userInfo.gender,
                avatar: userInfo.avatar,
                original: userInfo
            }


        }
        await next();
    };
}