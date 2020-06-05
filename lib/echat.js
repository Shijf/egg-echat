'use strict';

const AccessToken = require('./baseService/accessToken');
const Contact = require('./echat/contacts/contacts');
const Agent = require('./echat/agents/agents');
const Message = require('./echat/message/messages');
const JsSdk = require('./echat/jssdk/jssdk');
const Oauth2 = require('./echat/oauth2/oauth2');
const Server = require('./echat/server/server');



class EChat {
    constructor(config) {
        this.config = config;
        this.ctx = config.ctx;
        this.config['Corp'] = config && config.CorpInfo;
        this.config['Agent'] = config && config.AgentInfo;
    }

    //get accessToken
    async _getAccessToken(flag) {
        const accessToken = new AccessToken(this.config);
        return await accessToken.getToken(flag);
    }

    //通讯录管理
    contacts() {
        let contacts = new Contact(this.config);
        return contacts;
    }

    //应用管理
    agents() {
        let agents = new Agent(this.config);
        return agents;
    }

    //消息推送
    message() {
        return new Message(this.config);
    }

    //JsSdk
    jssdk(url) {
        url = url || this.ctx.protocol + '://' + this.ctx.get('host') + this.ctx.request.url
        let jssdk = new JsSdk(this.config, url);
        return jssdk;
    }
    //网页授权
    oauth2() {
        return new Oauth2(this.config);
    }

    //接收服务器消息
    server() {
        return new Server(this.config);
    }




}

module.exports = EChat;