'use strict';

const Messenger = require('./messenger/messenger');
class Messages {
    constructor(config) {
        this.messenger = new Messenger(config);
        return this;
    }
}


module.exports = Messages;