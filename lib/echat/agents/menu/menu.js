'use strict';
const Http = require('./../../../baseService/baseClient');
class Menu {
    constructor(config) {
        this.config = config;
        this.ctx = config.ctx;
        this.http = new Http(config, 'agent');
    }
    /**
     * 获取应用菜单
     * @param {number} agentid 
     */
    async get(agentid) {

        agentid = agentid ? agentid : this.config.Agent.AgentId;

        return await this.http.httpGet('/cgi-bin/menu/get', {
            agentid
        });
    }
    /**
     * 
     * @param {*number} agentid 
     * @param {*} menu 
     */
    async create(agentid, menu) {

        agentid = agentid ? agentid : this.config.Agent.AgentId;
        
        let { httpClient, accessToken } = await this.http.httpPostSpecWithToken();

        let res;
        try {
            res = await httpClient.curl(`/cgi-bin/menu/create?access_token=${accessToken}&agentid=${agentid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                menu,
                dataType: 'json'
            });
            console.log(res);
            if (res.status !== 200) {
                throw new Error(res)
            }
        } catch (error) {
            this.ctx.logger.error(res);
        } finally {
            return res.data;
        }


    }

    /**
     * 删除应用菜单
     * @param {number} agentid 
     */
    async delete(agentid) {//全部
        agentid = agentid ? agentid : this.config.Agent.AgentId;

        return await this.http.httpGet('/cgi-bin/menu/delete', {agentid});
    }


}

module.exports = Menu;
