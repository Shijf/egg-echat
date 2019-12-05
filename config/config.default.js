'use strict';

/**
 * egg-echat default config
 * @member Config#echat
 * @property {String} SOME_KEY - some description
 */
exports.echat = {
    cache: {
        flag: 'echat',
        // driver: 'redis'
    },
    CorpInfo: {
        ApiUrl: 'http://1.2.3.4:8081', //请勿带 " / "
        CorpID: 'hshagdjhsa454',
        OauthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize',
        // UserApiSecret: ' ',
        // AgentApiSecret: ' ',
        // DeviceApiSecret: ' ',
        // LogApiSecret: ' ',
    },
    AgentInfo: {
        AgentId: 1000177,
        AgentSecret: 'yIgAOVx0XDla6Qka_81pbHZ6BPoLPXyZFSKUTCBqeN4',
        token: 'TDkvYZyk',
        EncodingAESKey: 'XxIctVYOTgowmJdXliwvCMiFZH9LICQQvcLYGGe8rSS',
        oauth: {
            // scopes: 'snsapi_userinfo',  //  snsapi_base | snsapi_userinfo | snsapi_privateinfo ,
            // redirect_uri: '' //框架内一般不用填写，中间件可自动获取当前的页面
        }
        // redirect_domain: '', //可信域名、不写http(https)协议
        // home_url: '', //主页链接，若没有则不写 写http(https)协议
    },
};