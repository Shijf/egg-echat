'use strict';

const Http = require('./../../../baseService/baseClient');

class User {

    constructor(config) {
        this.ctx = config.ctx;
        this.http = new Http(config, 'user');
    }

    /*******************用户相关******************* */
    //get user
    async get(userId, avatar_addr) {
        const user = await this.http.httpGet('/cgi-bin/user/get', {
            userid: userId,
            avatar_addr: avatar_addr || 1
        });

        return user;
    }
    //delete user
    async delete(userList) {
        let userTemp = userList;
        let user;
        if (typeof (userList) === 'string' ) { //有可能是单独删除一条，则将字符串转为数组，调用批量删除接口
            userList = [];
            userList.push(userTemp);
        }

        let group = this.group(userList, 200);

        for (let index = 0; index < group.length; index++) {
            const element = group[index];

            try {
                user = await this.http.httpPost('/cgi-bin/user/batchdelete', {
                    useridlist: element
                });
                console.log(user);
                if (user.errcode !== 0) {
                    throw new Error('删除失败');
                }
            } catch (error) {
                this.ctx.logger.error(`删除${element}失败, 删除失败的为：${element[index - 1] ? element[index - 1] : []}`);
                this.ctx.logger.error(user);
            } finally {
                return user;
            }


        }
        return user;
    }

    // update user
    async update(userId, data) {

        data = data || userId;

        if (userId) {
            if ('string' === typeof (userId)) {
                data.userid = userId;
            }
            const user = await this.http.httpPost('/cgi-bin/user/update', data);
            console.log(user);

            return user;
        } else {
            throw new Error('userId is required.');
        }


    }

    //create user
    async create(data) {
        const user = await this.http.httpPost('/cgi-bin/user/create', data);

        return user;
    }


    //批量删除时的对于大于200条，进行分组处理
    group(array, subGroupLength) {
        let index = 0;
        let newArray = [];
        while (index < array.length) {
            newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
    }


    /******************用户相关结束******************* */
    /******************部门相关******************* */

    /**
     * 获取部门成员
     * 应用须拥有指定部门的查看权限。
     * @param {*number} department_id 
     * @param {*number} fetch_child 
     */
    async getDepartmentUsers(departmentId, fetchChild) {
        let users = this.http.httpGet('/cgi-bin/user/simplelist', {
            department_id: +departmentId,
            fetch_child: +fetchChild || 0 //此处的+代表，将参数中的Boolean转为number,
        });

        return users;
    }
    /**
     * 获取部门成员详情
     * @param {*mix} departmentId 
     * @param {*number} fetchChild 
     */
    async getDetailedDepartmentUsers(departmentId, fetchChild) {
        let users = this.http.httpGet('/cgi-bin/user/list', {
            department_id: +departmentId,
            fetch_child: +fetchChild || 0 //此处的+代表，将参数中的Boolean转为number,
        });

        return users;
    }
    /**
     * 重置密码，默认以短信的方式通知
     * @param {*string} userId 
     * @param {*string} pwd 
     * @param {*number} isnotify 
     */
    async resetpwd(userId, pwd, isnotify = true) {


        let result = this.http.httpPost('/cgi-bin/user/resetpwd', {
            userid: userId,
            pwd: pwd || undefined,
            isnotify: isnotify ? 1 : 0
        });

        return result;
    }
    /**
     * 强制用户下线
     * @param {*array} useridList 
     */
    async offline(userList) {
        let userTemp = userList;
        let user;
        if (typeof (userList) === 'string') { //有可能是单独删除一条，则将字符串转为数组，调用批量删除接口
            userList = [];
            userList.push(userTemp);
        }
        
        let group = this.group(userList, 200);
        
        for (let index = 0; index < group.length; index++) {
            const element = group[index];
            try {
                user = await this.http.httpPost('/cgi-bin/user/offline', {
                    userid_list: element
                });
                // console.log(user);
                if (user.errcode !== 0) {
                    throw new Error('下线失败');
                }
            } catch (error) {
                this.ctx.logger.error(`下线${element}失败, 下线成功的为：${element[index - 1] ? element[index - 1] : []}`);
                this.ctx.logger.error(user);
            } finally {
                return user;
            }


        }
        return user;
    }
    /**
     * 将明文userid转换为密文userid
     * @param {array} userid_list 
     * @param {number} agentid 
     */
    async userIdToOpenid(userid_list, agentid) {
        let result = this.http.httpPost('/cgi-bin/user/enc_userid', {
            userid_list: userid_list,
            agentid
        });

        return result;
    }
}

module.exports = User;
