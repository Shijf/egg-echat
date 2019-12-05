'use strict';

const WXBizMsgCrypt = require('./MsgCrypt/WXBizMsgCrypt');

const Message = require('./../message/messages');
class Server {
    constructor(config) {
            this.config = config;
            this.ctx = config.ctx || null;
            this.replyMsg = '';
            this.clientMsg = null;
            return this;
        }
        /**
         * 验证URL回调
         * @param {*} msg 微信官方get请求的参数
         */
    server(msg) {

            msg = msg || this.eggjsQueryHandle();

            let token = this.config.Agent.token; // 开发者设定的Token
            let EncodingAESKey = this.config.Agent.EncodingAESKey; //签名密钥
            let CorpId = this.config.Corp.CorpID; //企业ID
            //解构出来消息参数
            let {
                msg_signature,
                timestamp,
                nonce,
                echostr,
                data
            } = msg;
            // 实例化解密
            let wxcpt = new WXBizMsgCrypt(token, EncodingAESKey, CorpId);

            if (echostr) { //只是用来验证URL
                this.replyMsg = wxcpt.VerifyURL(msg_signature, timestamp, nonce, echostr); // 返回解密后 echostr的明文
            } else { //接收客户端的消息
                //解密后的字符串
                this.clientMsg = wxcpt.DecryptMsg(msg_signature, timestamp, nonce, data);
            }
            return this;
        }
        /**
         * 发送验证服务
         */
    send(breakMsg) {
            if (!breakMsg) {
                return this.replyMsg;
            } else {
                return ''
            }
        }
        /**
         * 闭包调用
         * @param {function} callback 回调函数
         */
    async push(callback) {
            let queryString = this.ctx.query; //拿到微信的的参数
            //通过判断请求的method来判断 是验证URL还是接收消息
            let method = this.ctx.request.method; //获取请求的方式
            //判断此时是否为GET请求，即判断是否是验证URL的请求
            if (method === 'GET' && queryString.hasOwnProperty('echostr')) {
                return this.send(); //不传参数则只是为了验证URL
            }

            if (callback != undefined && typeof callback == 'function') {
                let result = await callback(this.clientMsg);

                let Msg = new Message(this.config);

                let res = await Msg.messenger.textMsg(result).toUser(this.clientMsg.FromUserName).send();

                if (res.errcode === 0 && res.invaliduser === '') {
                    return this.send('ok'); //防止重复执行
                }

            } else {
                throw new Error("第二个参数不是函数");
            }
        }
        /**
         * 获取用户发来的消息信息
         */
    getMessage() {

        return this.clientMsg;
    }

    eggjsQueryHandle() {
        let queryString = this.ctx.query; //拿到微信的的参数
        //通过判断请求的method来判断 是验证URL还是接收消息
        let method = this.ctx.request.method; //获取请求的方式

        if (method === 'GET' && queryString.hasOwnProperty('echostr')) { //用来验证 URL
            return queryString;
        } else if (method === 'POST') { //用来解密客户端发来的消息
            queryString.data = this.ctx.request.body;
            return queryString;
        }

    }
}


module.exports = Server;