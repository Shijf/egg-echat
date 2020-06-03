'use strict';

const helper = require('./../helper/helper');
const Cache = require('./../cache/cache');


class HttpClient {
    constructor(option) {
        this.baseUrl = option.baseUrl;
        this.ctx = option.ctx;
    }

    curl(url, args, callback) {
        url = this.baseUrl && this.baseUrl ? this.baseUrl + url : url;
        return this.ctx.curl(url, args, callback);
    }
}

class AccessToken {

    constructor(config, type) {        
        this.config = config;
        this.ctx = config.ctx;
        this.access_token = null;
        this.cache = new Cache(
            this.config.cache.flag, //在文件存储中会用到，用于区分不同的企业
            this.config.cache.driver, //选择存储引擎 [ file/redis ]
            this.ctx //将ctx实例注入到
        );
        // this.flag = helper.md5(`${this.config.Corp.CorpID}`);
        this.secret = this.config.Agent.AgentSecret;
        if (type) {
            switch (type) { //若配置文件没有，则使用应用的默认secret，可用于展示
                case 'agent': //应用管理
                    this.secret = this.config.Corp.AgentApiSecret || this.secret;
                    break;
                case 'user': //用户管理
                    this.secret = this.config.Corp.UserApiSecret || this.secret;
                    break;
                case 'device': //设备管理
                    this.secret = this.config.Corp.DeviceApiSecret || this.secret;
                    break;
                case 'log': //设备管理
                    this.secret = this.config.Corp.LogApiSecret || this.secret;
                    break;
                default:
                    break;
            }
        }
    }
    //获取Token
    async getToken(flag) {
        flag = flag || false; //是否强制刷新accessToken
        //1. 先从缓存中获取，不过如果调用者需要强制从服务器拉取(刷新操作)则从服务器拉取
        flag ? await this.refreshToken() : await this.getTokenFromCache();
        await this.getTokenFromCache();
        // //2. 缓存中没有则从服务器中获取
        if (!this.access_token) {
            await this.getTokenFromServer();
        }

        return this.access_token;
    }
    //从缓存中获取Token
    async getTokenFromCache() {
        this.access_token = await this.cache.get(helper.md5(`${this.config.Agent.AgentId}_${this.secret}`));
    }
    //从服务器获取Token
    async getTokenFromServer() {

        const ctx = this.ctx;
        let url = this.config.Corp.ApiUrl;
        if (url[url.length - 1] == '/') { // 防止程序后续出错
            url = url.substr(0, url.length-1)
        }
        const baseUrl = url || this.config.Corp.ApiUrl;
        const httpClient = new HttpClient({
            baseUrl,
            ctx
        });
        let res;
        try {
            res = await httpClient.curl(`/cgi-bin/gettoken?corpid=${this.config.Corp.CorpID}&corpsecret=${this.secret}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                dataType: 'json'
            });
        } catch (error) {
            ctx.logger.error(new Error(error));
            ctx.logger.error(new Error('whoops'));
        }
        //检测请求结果，并返回
        const data = res.data;
        if (data) {
            if (data.errcode !== 0) { // 获取accessToken出错时抛出异常
                try {
                    throw new Error(data);
                } catch (error) {
                    ctx.logger.error(JSON.stringify(data));
                }
            } else if (data.errcode === 0 && data.errmsg === 'ok') {
                this.access_token = data.access_token;
                ctx.logger.info('从服务器拿的token：↓');
                ctx.logger.info(this.access_token);
                ctx.logger.info('从服务器拿的token：↑');
                //将token存进缓存
                await this.storeToken2Cache();
            }
        }
    }
    //获取的token储存
    async storeToken2Cache() {
        const ctx = this.ctx;
        try {
            let result = await this.cache.put(helper.md5(`${this.config.Agent.AgentId}_${this.secret}`), this.access_token, 7100);
            ctx.logger.info("AccessToken存入的结果:" + result);

            if (!result) {
                throw new Error('存入AccessToken失败');
            } else {
                ctx.logger.info('存入AccessToken成功');
            }
        } catch (error) {
            ctx.logger.error('存入AccessToken失败');
        }
    }

    //刷新缓存中的Token
    async refreshToken() {
        await this.getTokenFromServer();
        return this;
    }

}

module.exports = AccessToken;