'use strict';
const fs = require('fs');
const path = require('path');
const Lnob = require('lndb');
// // // const logger = require('../../logger/logger');

class FileCache {
    /**
     * 
     * @param {string} flag 
     */
    constructor(flag) {
        let regOfFlag = new RegExp('[\\\\/:*?\"<>|]');
        if (regOfFlag.test(flag)) {
            message = `${flag}中不能包含【\\\\/:*?\"<>|】这些非法字符,请修改合法的文件名!`;
            // logger.error(`${message}`);
            process.exit();
            return flag;
        }
        this.dir = path.resolve(__dirname, '../../../storge/');
        this.existsDir = true;
        //不存在则创建文件夹
        if (!fs.existsSync(this.dir)) {
            this.existsDir = false;
            fs.mkdirSync(this.dir);
            if (fs.existsSync(this.dir)) {
                this.existsDir = true;
                // logger.info('存储文件夹创建成功');
            }
        }
        //再次检查是否存在这个文件夹
        if (this.existsDir) {
            this.db = new Lnob(this.dir);
        } else {
            // logger.error(`缓存未创建成功`);
            // logger.error(`${this.dir} is make failed!`);
        }
        flag = flag || 'echat';
        //设置标签
        this.cache = this.db.init(flag);
    }
    //获取对应的值
    async get(key) {
        // 检查当前的值是否已经过期，过期后删除，返回undefined
        let isExpires = await this.isExpires(key);

        if(isExpires) {
            this.forget(key);
            return undefined;
        }
        let key_value = await this.cache.get(key);//作用：暂存变量
        return key_value ? key_value.data.value : key_value;
    }
    //储存值
    async put(key, value, seconds) {
        try {
            this.cache.set(key, {
                key,
                value,
                human_expires_time: seconds && seconds !== -1 ? new Date((new Date().getTime() + (seconds * 1000))) : '长期有效',//人类时间
                expires_time: seconds && seconds !== -1 ? (new Date().getTime() + (seconds * 1000)) : -1 //设置过期时间
            });

            let key_value = await this.get(key);//作用：暂存变量
            //若已存储的值和存的值相同，那么就可以判定为成功
            return key_value ? true : false;
        } catch (error) {
            // logger.error(error);
        }
    }
    //检查是否存在返回Boolean
    async has(key) {
        let result = await this.cache.get(key);
        return Object.keys(result).length === 0 ? false : true;
    }
    // 只增加不存在的，若存在则刷新
    async remember(key, seconds, callback) {

        if (typeof seconds === 'function') {
            callback = seconds;
            seconds = null;
        }
        seconds = seconds || -1; //不存在则永久存储
        callback = callback || null;
        if (typeof callback === 'function') {
            let value = await callback();
            return await this.put(key, value, seconds);
        }


        // logger.error(`${callback} must be type of function`);

        process.exit();
    }
    //存为永久值
    async rememberForever(key, callback) {
        if (typeof callback === 'function') {
            return await this.remember(key, callback);
        }

        // logger.error(`${callback} must be type of function`);

        process.exit();
    }

    //从缓存中获取到数据之后再删除它
    async pull(key) {
        let value = await this.has(key) ? await this.get(key) : undefined;
        this.forget(key);
        return value;
    }
    //删除一个值
    async forget(key) {
        return await this.cache.remove(key);
    }
    //删除全部的值
    async flush() {
        return await this.cache.clear();
    }

    //检查某个键是否过期
    async isExpires(key) {
        if (await this.has(key)) {
            let expires_time = await this.cache.get(key).data.expires_time;
            let cur_timestamp = new Date().getTime();
            if (expires_time === -1) {
                return false;
            } else {
                return cur_timestamp >= expires_time ? true : false;
            }
        } else {
            return true;
        }
    }
}

module.exports = FileCache;