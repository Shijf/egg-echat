'use strict';

const Echat = require('../../lib/echat');

module.exports = {
    echat(config) {

        config = config || this.app.config.echat;

        config = Object.assign(config, this.app.config.echat); //合并配置

        config.ctx = this;

        const S_echat = Symbol(`Context${config}`);

        if (!this[S_echat]) {
            // 例如，从 header 中获取，实际情况肯定更复杂
            this[S_echat] = new Echat(config);
        }

        return this[S_echat];
    }
};