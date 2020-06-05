'use strict';

const AccessToken = require('./accessToken');

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

class BaseClient {
    constructor(config, type) {
        this.accessToken = null;
        this.config = config;
        this.ctx = config.ctx;
        this.type = type || 'default' ; //获取对应的 accessToken，默认为应用的secret
    }

    //获取accesstoken
    async _getAccessToken(flag) {

        const accessToken = new AccessToken(this.config, this.type);
        
        const token = await accessToken.getToken(flag);

        this.accessToken = token;

        return this;
    }

    //build GetClient
    async httpGet(url, data) {
        data = data || {};
        //获取 Token
        await this._getAccessToken();
        let httpClient = new HttpClient({
            baseUrl: this.config.Corp.ApiUrl,
            ctx: this.ctx
        });
        let res;
        try {
            res = await httpClient.curl(`${url}?access_token=${this.accessToken}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                data,
                dataType: 'json',
                timeout: 8000,
            });
            if (res.status !== 200) {
                throw new Error(res)
            }
        } catch (error) {
            console.log(error);
        } finally {
            return res.data || res;
        }
    }

    //build PostClient
    async httpPost(url, data) {
        data = data || {};
        //获取 Token
        await this._getAccessToken();

        let httpClient = new HttpClient({
            baseUrl: this.config.Corp.ApiUrl,
            ctx: this.ctx
        });
        let res;
        try {
            res = await httpClient.curl(`${url}?access_token=${this.accessToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                data,
                dataType: 'json'
            });
            // console.log(res);
            if (res.status !== 200) {
                throw new Error(res)
            }
        } catch (error) {
            console.log(res);
        } finally {
            
            return res.data || res;
        }
    }

    //build PostClient for menu
    async httpPostSpecWithToken() {
        let httpClient = new HttpClient({
            baseUrl: this.config.Corp.ApiUrl,
            ctx: this.ctx
        });
        return {
            httpClient,
            accessToken: (await this._getAccessToken()).accessToken
        };
    }




}

module.exports = BaseClient;
