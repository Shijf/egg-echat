'use strict';

const Http = require('./../../../baseService/baseClient');


class Tag {

    constructor(config) {
        this.http = new Http(config, 'user');
    }
    /**
     * 
     * @param {object} data 
     * 
     * 
     * data = {
        "tagname": "UI",
        "tagid": 12  标签id，非负整型，指定此参数时新增的标签会生成对应的标签id，不指定时则以目前最大的id自增。
        }
     */
    async create(tagName, tagId) {
        const tag = await this.http.httpPost('/cgi-bin/tag/create', {
            tagname: tagName,
            tagid: tagId
        });
        return tag;
    }

    /**
     * 调用者必须是指定标签的创建者。
     * @param {number} tagId 
     * @param {string} tagName 
     */
    async update(tagId, tagName) {
        const tag = await this.http.httpPost('/cgi-bin/tag/update', {
            tagname: tagName,
            tagid: tagId
        });
        return tag;
    }
    /**
     * 自建应用或通讯同步助手可以获取所有标签列表，第三方应用仅可获取自己创建的应用标签
     */
    async list() {
        const tag = await this.http.httpGet('/cgi-bin/tag/list');
        return tag;

    }
    /**
     *  删除标签
     * @param {number} tagId 
     */
    async delete(tagId) {
        const tag = await this.http.httpGet('/cgi-bin/tag/delete', {
            tagid: tagId
        });
        return tag;
    }
    /**
     * 获取标签成员(详情)
     * @param {number} tagId 
     */
    async get(tagId) {
        return await this.http.httpGet('/cgi-bin/tag/get', {
            tagId
        });
    }
    /**
     * 增加标签成员
     * @param {number} tagId 
     * @param  {...any} userList 
     */
    async tagAddUsers(tagId, ...userList) {
        if (userList && this.isArray(userList[0])) {
            userList = userList[0];
        }

        return await this.http.httpPost('/cgi-bin/tag/addtagusers', {
            tagid: tagId,
            userlist: userList
        });
    }
    /**
     * 增加标签部门
     * @param {number} tagId 
     * @param  {...any} departmentList 
     */
    async tagAddDepartments(tagId, ...departmentList) {

        if (departmentList && this.isArray(departmentList[0])) {
            departmentList = departmentList[0]
        }

        return await this.http.httpPost('/cgi-bin/tag/addtagusers', {
            tagid: tagId,
            partylist: departmentList
        });
    }

    /**
     * 删除标签成员
     * @param {number} tagId 
     * @param  {...any} userList 
     */
    async tagDeleteUsers(tagId, ...userList) {
        if (userList && this.isArray(userList[0])) {
            userList = userList[0];
        }

        return await this.http.httpPost('/cgi-bin/tag/deltagusers', {
            tagid: tagId,
            userlist: userList
        });
    }
    /**
     * 删除标签部门
     * @param {number} tagId 
     * @param  {...any} departmentList 
     */
    async tagDeleteDepartments(tagId, ...departmentList) {
        if (departmentList && this.isArray(departmentList[0])) {
            departmentList = departmentList[0]
        }
        return await this.http.httpPost('/cgi-bin/tag/deltagusers', {
            tagid: tagId,
            partylist: departmentList
        });
    }

    /**
     * 判断是否为数组类型 
     * @param {Array} obj 
     */
    isArray(obj) {
        return (typeof obj == 'object') && obj.constructor == Array;
    }

    /**
     * 判断是否为字符串类型 
     * @param {string} str 
     */
    isString(str) {
        return (typeof str == 'string') && str.constructor == String;
    }





}

module.exports = Tag;
