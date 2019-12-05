'use strict';

class RedisCache {
    constructor(flag, ctx) {
        this.flag = flag;
        this.cache = ctx.app.redis;
    }

    async get(key) {

        if (await this.has(key)) {
            return await this.cache.get(key);
        }
    }

    async put(key, value, seconds) {

        let result = await this.cache.set(key, value);

        if (result && seconds) {
            result = await this.cache.expire(key, seconds);
        }
        return result === 'OK' || result === 1 ? true : false;
    }

    //检查是否存在返回Boolean
    async has(key) {
        return await this.cache.exists(key) === 1 ? true : false;
    }
    //存储
    async remember(key, seconds, callback) {

        let result = callback();

        if (result) {
            return await this.cache.put(key, result, seconds);
        }

    }
    //存为永久值
    async rememberForever(key, callback) {
        let result = callback();

        if (result) {
            return await this.cache.put(key, result);
        }
    }

    //从缓存中获取到数据之后再删除它
    async pull(key) {
        let result = await this.get(key);

        if (result) {
            return result;
        } else {
            return false;
        }

    }
    //删除一个值
    async forget(key) {
        if (this.has(key)) {
            return await this.cache.del(key) === 1 ? true : false;
        }
        return true;
    }
    //删除全部的值
    async flush() {
        return await this.cache.flushall() === 'OK' ? true : false;
    }
}

// interface 

module.exports = RedisCache;