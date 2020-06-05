
const Service = require('egg').Service;

class EchatAuthService extends Service {

    //用户是否已用echat登陆
    async check() {
        const result = await this.ctx.session.echat;
        if (result) {
            return true;
        } else {
            return false;
        }
    }

}

module.exports = EchatAuthService;

