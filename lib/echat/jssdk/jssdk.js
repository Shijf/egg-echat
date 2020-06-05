'use strict';

const Ticket = require('./../../baseService/ticketHandel'); //统一处理Ticket
const helper = require('../../helper/helper');
const URL = require('url');
class JsSdk {
    constructor(config, url) {
        this.config = config;
        this.url = url ? url : null ;
    }
    /**
     * 
     * @param {array} apis 
     * @param {Boolean} debug 
     * @param {Boolean} beta 
     * @param {Boolean} json 
     */
    async buildConfig(apis, beta = false, debug = false) {

        let js_config = await this.configSignature();
        let js_agent_config = null;
        js_config['debug'] = debug;
        js_config['beta'] = beta;
        js_config['jsApiList'] = apis ? apis : [];

        if (beta) {
            js_agent_config = await this.agentConfigSignature();
            return {
                js_config,
                js_agent_config: js_agent_config ? js_agent_config : {}
            };
        }

        return js_config;
    }

    /**
     * 生成JSSDK的签名
     * @param {string} ticket 
     * @param {string} noncestr 
     * @param {string} timestamp 
     * @param {string} url 
     */
    getTicketSignature(ticket, noncestr, timestamp, url) {

        const string1 = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}` //拼接字符串

        let sign = helper.sha1(string1);

        return sign;
    }
    /**
     * 通过config接口注入权限验证配置
     * @param {String} url 
     * @param {String} nonceStr 
     * @param {String} timestamp 
     */
    async configSignature(url = null, nonceStr = null, timestamp = null) {
        url = url ? url : this.getUrl(); //拿到url

        nonceStr = nonceStr ? nonceStr : helper.randomString(10); //生成随机字符串

        timestamp = timestamp ? timestamp : Math.round(new Date().getTime() / 1000); //时间戳

        return {
            appId: this.config.Corp.CorpID,
            nonceStr,
            timestamp,
            url,
            signature: this.getTicketSignature(await this.getJsTicket(), nonceStr, timestamp, url),
        };

    }
    /**
     * 通过agentConfig注入应用权限
     * @param {String} url 
     * @param {String} nonceStr 
     * @param {String} timestamp 
     */
    async agentConfigSignature(url = null, nonceStr = null, timestamp = null) {
        url = url ? url : this.getUrl(); //拿到url

        nonceStr = nonceStr ? nonceStr : helper.randomString(10); //生成随机字符串

        timestamp = timestamp ? timestamp : Math.round(new Date().getTime() / 1000); //时间戳

        return {
            agentid: this.config.Agent.AgentId,
            corpid: this.config.Corp.CorpID,
            nonceStr,
            timestamp,
            url,
            signature: this.getTicketSignature(await this.getAgentConfig(), nonceStr, timestamp, url),
        };

    }

    getUrl() {
        //处理URL为特定的样式
        let url = URL.parse(this.url);
        
        return `${url.protocol}//${url.host}${url.path}`
    }

    async getJsTicket() {
        let jsTicket = new Ticket(this.config, 'js_config');
        return jsTicket.getTicket();
    }
    async getAgentConfig() {
        let jsTicket = new Ticket(this.config, 'js_agent_config');
        return jsTicket.getTicket();
    }

    /**
     * 所有JS接口列表
     */
    jsApiList() {
        return [
            'onMenuShareAppMessage',
            'onMenuShareWechat',
            'startRecord',
            'stopRecord',
            'onVoiceRecordEnd',
            'playVoice',
            'pauseVoice',
            'stopVoice',
            'onVoicePlayEnd',
            'uploadVoice',
            'downloadVoice',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage',
            'getNetworkType',
            'openLocation',
            'getLocation',
            'hideOptionMenu',
            'showOptionMenu',
            'hideMenuItems',
            'showMenuItems',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'closeWindow',
            'scanQRCode',
            'chooseVideo',
            'uploadVideo',
            'downloadVideo',
            'agentConfig',
            'getStepCount',
            'getAllPhoneContacts',
            'addCalendarEvent',
            'showWatermark',
            'launch3rdApp',
            'getInstallState',
            'openUserProfile',
            'selectExternalContact',
            'selectEnterpriseContact',
            'bioassayAuthentication',
            'openUrl',
            'openEnterpriseApp',
            'request3rdApp'
        ];
    }











}


module.exports = JsSdk;