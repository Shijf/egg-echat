
const crypto = require('crypto');
const errCode = require('./ErrorCode');



/**
 * 提供接收和推送给公众平台消息的加解密接口.
 */
class Prpcrypt {

    constructor(k) {
        this.key = Buffer.from(k + '=', 'base64');        
        this.iv = this.key.slice(0, 16);
    }

    /**
     * 加密
     * @param {string} xmlMsg
     * @param {string} receiveId 
     */
    encrypt(xmlMsg, receiveId) {        
        // let xmlMsg = text;
        try {
            //拼接
            var random16 = crypto.pseudoRandomBytes(16); //生成随机字节流
            // var random16 = this.randomString(); //生成随机字节流

            let msg = Buffer.from(xmlMsg);
            //微信规定的4字节长度
            var msgLength = Buffer.alloc(4);
            //以无符号长整型写入，相当于PHP示例程序的pack('N', '$text)
            msgLength.writeUInt32BE(msg.length, 0);


            //将corpId以二进制的方式写入内存
            var corpId = Buffer.from(receiveId);
            // var corpId = receiveId;


            //拼接待加密的字符串
            var raw_msg = Buffer.concat([random16, msgLength, msg, corpId]);//randomString + msgLength + xmlMsg + this.corpID;
            
            raw_msg = this.PKCS7Encoder(raw_msg);
                        
            //加密
            let cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.iv);
            //二进制写入
            let cipheredMsg = Buffer.concat([cipher.update(raw_msg), cipher.final()]);
            //将进行base64的编码
            return cipheredMsg.toString('base64');
        } catch (error) {
            
        }
    }

    /**
     * 解密
     * @param {mix} encrypted 
     * @param {number} receiveId 
     */
    decrypt(encrypted, receiveId) {
        
        try {
            let aesCipher = crypto.createDecipheriv("aes-256-cbc", this.key, this.iv);
            aesCipher.setAutoPadding(false); //不自动切断

            let decipheredBuff = Buffer.concat([aesCipher.update(encrypted, 'base64'), aesCipher.final()]);
            decipheredBuff = this.PKCS7Decoder(decipheredBuff);
            // 去掉rand_msg头部的16个随机字节，4个字节的msg_len, 和尾部的$CorpID即为最终的消息体原文msg
            let len_netOrder_corpid = decipheredBuff.slice(16); //去掉rand_msg头部的16个随机字节
            let msg_len = len_netOrder_corpid.slice(0, 4).readUInt32BE(0); // 4个字节的msg_len
            const result = len_netOrder_corpid.slice(4, msg_len + 4).toString();  // 最终的消息体原文msg
            let appId = len_netOrder_corpid.slice(msg_len + 4).toString(); // 尾部的$CorpID

            if (receiveId === appId) { // 验证企业Id，不对则不通过
                return result; // 返回一个解密后的明文-
            } else {
                throw Error(errCode.ValidateCorpidError);
            }
        } catch (error) {
            return new Error('errCode:' + errCode.ValidateCorpidError);
        }
    }

    /**
     * 生成随机字符 没用到
     * @param {number} len 生成的字符长度
     */
    randomString(len) {
        len = len || 16;
        const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        const maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    }

    /**
     * 对需要加密的明文进行填充补位
     * @param {*} buff 需要进行填充补位操作的明文
     */
    PKCS7Encoder(buff) {
        let blockSize = 32;
        let strSize = buff.length;
        let amountToPad = blockSize - (strSize % blockSize);
        if (amountToPad === 0) {
            amountToPad = blockSize;
        }
        
        let pad = Buffer.alloc(amountToPad - 1, String.fromCharCode(amountToPad));
        return Buffer.concat([buff, pad]);
    }
    /**
     * 
     * 对解密后的明文进行补位删除
     * @param {string} buff 解密后的明文
     */
    PKCS7Decoder(buff) {
        var pad = buff[buff.length - 1];
        if (pad < 1 || pad > 32) {
            pad = 0;
        }
        return buff.slice(0, buff.length - pad);
    }


}

Prpcrypt.key = null;
Prpcrypt.iv = null;




module.exports = Prpcrypt;
