'use strict'
const crypto = require('crypto');
/**
 * 工具类
 */
class Helper {
  /**
   * 判断结尾是否包含某个
   * @param {string} str 
   * @param {string} target 
   * use👇
   * confirmEnding("He has to give me a new name", "name");
   */
  static confirmEnding(str, target) {
    var start = str.length - target.length;
    var arr = str.substr(start, target.length);
    if (arr == target) {
      return true;
    }
    return false;
  }

  static md5(str) {

    let md5 = crypto.createHash('md5');
    md5.update(str);
    let sign = md5.digest('hex');
    // console.log(sign);

    return sign;
  }

  static sha1(str) {

    let sha1String = crypto.createHash('sha1');
    sha1String.update(str);
    let sign = sha1String.digest('hex');

    return sign;
  }
  /**
   * 生成随机字符串
   * @param {number} len 
   */
  static randomString(len) {
    len = len || 32;
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    const maxPos = $chars.length;
    let str = '';
    for (let i = 0; i < len; i++) {
      str += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
  }
  /**
   * 判断是否为数组
   * @param {mix} obj 
   */
  static isArray(obj) {
    return (typeof obj == 'object') && obj.constructor === Array;
  }
  /**
   * 判断是否为字符串
   * @param {mix} str 
   */
  static isString(str) {
    return (typeof str == 'string') && str.constructor == String;
  }
  /**
   * 判断是否为数值类型
   * @param {mix} obj 
   */
  isNumber(obj) {
    return (typeof obj == 'number') && obj.constructor == Number;
  }
  
}

module.exports = Helper;







