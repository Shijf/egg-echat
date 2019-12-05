'use strict';
const Http = require('./../../../baseService/baseClient');

class Group {
    constructor(config) {
        this.http = new Http(config, 'agent');
    }
    /**
     * 创建组名称
     * @param {string} groupName 
     */
    async create(groupName) {
        return await this.http.httpPost('/cgi-bin/group/create', {name: groupName});
    }
    
    /**
     * 更新组名称
     * @param {object} param
     */
    async update({groupid, name, order}) {
        return await this.http.httpPost('/cgi-bin/group/update', {
            groupid,
            name,
            order//非必须
        });
    }
    
    /**
     * 删除分组
     * @param {number} groupid 
     */
    async delete(groupid) {
        return await this.http.httpPost('/cgi-bin/group/delete', {groupid});
    }

    /**
     * 增加分组应用
     * @param {number} groupid 
     * @param {array} agentid_list 
     */
    async addApps(groupid, agentid_list) {
        
        return await this.http.httpPost('/cgi-bin/group/addapps', {groupid,agentid_list});
        
    }
    /**
     * 接口说明：
     * 从分组中移除的应用被添加到默认分组
     * @param {number} groupid 
     * @param {number} agentid 
     */
    async removeApp(groupid, agentid) {
        return await this.http.httpPost('/cgi-bin/group/removeapp', {groupid,agentid});
    }

    async appList(groupid) {
        return await this.http.httpPost('/cgi-bin/group/applist', {groupid});
    }
    /**
     * 获取列表
     */
    async groupList() {
        return await this.http.httpPost('/cgi-bin/group/list');
    }
    /**
     * 1：九宫格格式； 0：列表格式
     * @param {number} show_type 
     */
    async setWorkBench(show_type) {
        return await this.http.httpPost('/cgi-bin/corp/setworkbench',{show_type});
    }


}

module.exports = Group;
