'use strict';
const Http = require('./../../../baseService/baseClient');

class Agent {
    constructor(config) {
        this.config = config;
        this.http = new Http(config, 'agent');
    }

    async create(data) {
        return await this.http.httpPost('/cgi-bin/agent/create', data);
    }


    /**
     * 获取单个应用信息
     * @param {number} agentid 
     */
    async get(agentid) {

        agentid = agentid ? agentid : this.config.Agent.AgentId;

        return await this.http.httpGet('/cgi-bin/agent/get', {
            agentid
        });
    }


    /**
     * 获取应用列表
     */
    async list(agent_status) {
        return await this.http.httpPost('/cgi-bin/agent/list', {
            agent_status: agent_status ? agent_status : 1
        });
    }
    /**
     * 设置应用
     * @param {object} data 
     */
    async set(data) {

        if (data && !data.agentid && !data.agentId) {
            data.agentid = this.config.Agent.AgentId;

        }       


        return await this.http.httpPost('/cgi-bin/agent/set', data);
    }
    /**
     * 删除应用
     * @param {number} agentid 
     */
    async delete(agentid) {
        return await this.http.httpPost('/cgi-bin/agent/delete', {
            agentid
        });
    }
    /**
     * 启用应用
     * @param {number} agentid 
     */
    async open(agentid) {
        if (!agentid) {
            agentid = this.config.Agent.AgentId;

        }
        return await this.http.httpPost('/cgi-bin/agent/open', {
            agentid
        });
    }

    /**
     * 关闭应用
     * @param {number} agentid 
     */
    async close(agentid) {
        agentid = agentid ? agentid : this.config.Agent.AgentId;

        return await this.http.httpPost('/cgi-bin/agent/close', {
            agentid
        });
    }


    /**
     * 重置应用secret
     * @param {number} agentid 
     */
    async resetSecret(agentid) {
        agentid = agentid ? agentid : this.config.Agent.AgentId;

        return await this.http.httpPost('/cgi-bin/agent/resetsecret', {
            agentid
        });
    }
    /**
     * 开启应用回调
     * {
      "callback_url": "http://xxx.xxx.xxx",
      "token": "hJqcu3uJ9Tn2gXPmxx2w9kkCkCE2EPYo",
      "aeskey": "6qkdMrq68nTKduznJYO1A37W2oEgpkMUvkttRToqhUt",
       "agentid": 1000027
      }
     * @param {object} data 
     */
    async openCallback(data) {
        return await this.http.httpPost('/cgi-bin/agent/opencallback', data);
    }

    /**
     * 更新应用回调
     * @param {object} data 
     */
    async updateCallback(data) {
        if (data && !data.agentid && !data.agentId) {
            data.agentid = this.config.Agent.AgentId;
        }
        return await this.http.httpPost('/cgi-bin/agent/updatecallback', data);
    }
    /**
     * 停用应用回调
     * @param {number} agentid 
     */
    async closecallback(agentid) {

        agentid = agentid ? agentid : this.config.Agent.AgentId;
        return await this.http.httpPost('/cgi-bin/agent/closecallback', {
            agentid
        });

    }

    











}

module.exports = Agent;
