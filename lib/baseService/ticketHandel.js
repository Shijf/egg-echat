'use strict';

const Http = require('./baseClient');
const helper = require('./../helper/helper');
const Cache = require('./../cache/cache');

class Ticket {
    //配置，默认为应用的ticket 
    constructor(config, type) {
        this.config = config;
        this.ticket = null;
        this.ctx = config.ctx;
        this.flag = helper.md5(`${this.config.Corp.CorpID}`);
        this.logger = this.ctx.logger;
        this.cache = new Cache(
            this.config.cache.flag, //在文件存储中会用到，用于区分不同的企业
            this.config.cache.driver, //选择存储引擎 [ file/redis ]
            this.ctx //将ctx实例注入到
        );

        this.secret = this.config.Agent.AgentSecret; // 不传参则默认为 普通调用
        this.ticket_type = null;
        this.http = new Http(this.config);


        if (type) {
            switch (type) { //判断是哪个类型的ticket
                case 'userdetail': //应用管理
                    this.ticket_type = 'userdetail';
                    break;
                case 'js_config': //普通
                    this.ticket_type = 'jssdk';
                    break;
                case 'js_agent_config': //用户管理
                    this.ticket_type = 'jsAgentConfig';
                    break;
                default:
                    this.ticket_type = 'userdetail';
                    break;
            }
        }
    }
    //获取Ticket
    async getTicket(flag) {
        flag = flag || false; //是否强制刷新accessTicket
        //1. 先从缓存中获取，不过如果调用者需要强制从服务器拉取(刷新操作)则从服务器拉取
        flag ? await this.refreshTicket() : await this.getTicketFromCache();
        // await this.getTicketFromCache();        
        //2. 缓存中没有则从服务器中获取
        if (!this.access_Ticket) {
            await this.getTicketFromServer();
        }
        return this.access_Ticket;
    }
    //从缓存中获取Ticket
    async getTicketFromCache() {
        this.access_Ticket = await this.cache.get(helper.md5(`${this.config.Agent.AgentId}_${this.ticket_type}`));
    }
    //从服务器获取Ticket
    async getTicketFromServer() {
        let res;
        try {

            if (this.ticket_type === 'jsAgentConfig') {
                res = await this.http.httpGet('/cgi-bin/ticket/get', {
                    type: 'agent_config'
                });                
            } else if (this.ticket_type === 'jssdk') {
                res = await this.http.httpGet('/cgi-bin/get_jsapi_ticket');
            }

        } catch (error) {
            console.log(error);
            
            this.logger.error('Status 404');
            this.logger.error(res);
        }
        //检测请求结果，并返回
        const data = res;
        if (data) {
            if (data.errcode !== 0) { // 获取accessTicket出错时抛出异常
                try {
                    throw new Error(data);
                } catch (error) {
                    this.logger.error(JSON.stringify(data));
                }
            } else if (data.errcode === 0 && data.errmsg === 'ok') {
                this.ticket = data.ticket;

                this.logger.info('从服务器拿的Ticket：↓');
                this.logger.info(this.ticket);
                this.logger.info('从服务器拿的Ticket：↑');
                //将Ticket存进缓存
                await this.storeTicket2Cache();
            }
        }
        //将获取的Ticket储存
    }
    //获取的Ticket储存
    async storeTicket2Cache() {

        try {
            let result = await this.cache.put(helper.md5(`${this.config.Agent.AgentId}_${this.ticket_type}`), this.ticket, 7100);
            if (!result) {
                throw new Error(`'存入${this.ticket_type}Ticket失败'`);
            } else {
                this.logger.info(`存入${this.ticket_type}Ticket成功`);
            }
        } catch (error) {
            this.logger.error(`存入${this.ticket_type}Ticket失败`);
        }


    }

    //刷新缓存中的Ticket
    async refreshTicket() {
        await this.getTicketFromServer();
        return this;
    }

}

module.exports = Ticket;