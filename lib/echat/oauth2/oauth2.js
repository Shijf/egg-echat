'use strict';


const querystring = require('querystring');
const Client = require('../../baseService/baseClient');


class OAuth {
    constructor(config) {
        this.config = config;
        this.http = new Client(config);
        this.ctx = config.ctx;
    }
    /**
     * 获取重定向链接地址
     * @param {string} url 
     * @param {string} scope 
     * @param {string} state 
     */
    redirectUrl(url, scope, state) {
        url = url || this.config.Agent.oauth.redirect_uri || this.ctx.protocol + '://' + this.ctx.get('host') + this.ctx.request.url;
        var info = {
            appid: this.config.Corp.CorpID,
            redirect_uri: encodeURIComponent(url),
            response_type: 'code',
            scope: scope || this.config.Agent.oauth.scopes,
            state: state || '',
            agentid: this.config.Agent.AgentId //如果需要二次验证必须填入此参数
        };

        return (this.config.Corp.OauthUrl || 'https://open.weixin.qq.com/connect/oauth2/authorize') + '?' + querystring.stringify(info) + '#wechat_redirect';
    }
    /**
     * 根据Code获取人员信息
     * @param {string} code 
     * @param {boolean} detail 
     */
    async getUserInfo(code, detail = false) {
        try {
            //获取当前的用户信息
            let res = await this.http.httpGet('/cgi-bin/user/getuserinfo', {
                code
            });

            if (!detail) {
                return res;
            } else {
                return Object.assign(res, await this.getUserDetail(res.user_ticket));
            }
        } catch (error) {
            this.ctx.logger.error(error);
        }

    }
    /**
     * 根据成员票据获取成员详细信息
     * @param {string} user_ticket 
     */
    async getUserDetail(user_ticket) {
        try {
            //获取当前的用户信息
            let res = await this.http.httpPost('/cgi-bin/user/getuserdetail', {
                user_ticket
            });

            return res;
        } catch (error) {
            this.ctx.logger.error(error);
        }
    }

    //获取用户信息
    async user() {

        const ctx = this.ctx;
        const isEchatAuth = await ctx.service.echatAuth.check();


        if (!isEchatAuth) {
            const code = ctx.query.code;

            if (!code) {
                ctx.unsafeRedirect(await this.redirectUrl());
                return;
            }

            function isDetail() {
                let scope = (ctx.app.config.echat.Agent.oauth.hasOwnProperty('scopes') ? ctx.app.config.echat.Agent.oauth.scopes : null);
                return scope === 'snsapi_base' ? false : true;
            }

            let userInfo = await this.getUserInfo(code, isDetail());

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

        async function getId() {
            console.log(456);
        }



    }
}


module.exports = OAuth;