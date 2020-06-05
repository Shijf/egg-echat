'use strict';

const Http = require('./../../../baseService/baseClient');
const helper = require('./../../../helper/helper');

class Messenger {

    constructor(config) {
        this.http = new Http(config);
        this.agentId = config.Agent.AgentId;
        // console.log(this.agentId);
        this.msg = {
            agentid: this.agentId
        };
    }
    /**
     * 文本信息
     * @param {string} msg 
     */
    textMsg(content) {
        this.msg['msgtype'] = 'text',
            this.msg['text'] = {
                content
            }

        return this;

    }
    /**
     * 图片消息
     * @param {*} msg 
     */
    imgMsg(mediaId) {
        this.msg['msgtype'] = 'image';
        this.msg['image'] = {
            media_id: mediaId.toString()
        }

        return this;

    }

    voiceMsg(mediaId) {
        this.msg['msgtype'] = 'voice';
        this.msg['voice'] = {
            media_id: mediaId.toString()
        }
        return this;
    }

    videoMsg({ mediaId, title, description = '暂无描述' }) {
        this.msg['msgtype'] = 'video';
        this.msg['video'] = {
            media_id: mediaId.toString(),
            title,
            description
        }
        return this;
    }

    fileMsg(mediaId) {
        this.msg['msgtype'] = 'file';
        this.msg['file'] = {
            media_id: mediaId.toString(),
        }
        return this;

    }

    cardMsg({ title, description, url, btntxt = '详情' }) {
        this.msg['msgtype'] = 'textcard';
        this.msg['textcard'] = {
            title,
            description,
            url,
            btntxt
        }
        return this;

    }

    newsMsg(obj) {
        this.msg['msgtype'] = 'news';
        let articles = [];

        if (Object.prototype.toString.call(obj) === "[object Array]") {
            for (let index = 0; index < obj.length; index++) {
                const element = obj[index];
                articles.push(element);

            }
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            articles.push(obj);
        } else {
            console.log('格式不正确，请认真看文档')
        }

        this.msg['news'] = {
            articles
        }
        return this;
    }

    /**
     * 发送到人员
     * @param {Array OR Number Or String} userIds 
     */
    toUser(userIds) {
        if (helper.isArray(userIds)) {
            let users = userIds.join('|');
            this.msg['touser'] = users;
        } else {
            this.msg['touser'] = userIds.toString();
        }
        return this;
    }


    /**
     * 发送到部门
     * @param {mix} PartyIDs 
     */
    toParty(PartyIDs) {
        if (helper.isArray(PartyIDs)) {
            let parties = PartyIDs.join('|');
            this.msg['toparty'] = parties;
        } else {
            this.msg['toparty'] = PartyIDs.toString();
        }

        return this;
    }
    /**
     * 发送到标签
     * @param {mix} TagIds 
     */
    toTag(TagIds) {
        if (helper.isArray(TagIds)) {
            let parties = TagIds.join('|');
            this.msg['totag'] = parties;
        } else {
            this.msg['totag'] = TagIds.toString();
        }
        return this;
    }
    /**
     * 发送消息
     */
    async send() {
        // this.msg
        let res = await this.http.httpPost('/cgi-bin/message/send', this.msg);

        return res;
    }



}

module.exports = Messenger;
