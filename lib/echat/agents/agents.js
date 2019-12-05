'use strict';

const Group = require('./group/group');
const AgentManger = require('./agent/agent');
const Menu = require('./menu/menu');

class Agent {
    constructor(config) {
        this.manger = new AgentManger(config);
        this.group = new Group(config);
        this.menu = new Menu(config);
        return this;
    }
    
}


module.exports = Agent;