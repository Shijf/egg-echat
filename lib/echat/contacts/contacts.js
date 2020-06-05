'use strict';

const User = require('./users/users');
const Department = require('./departments/department');
const Tags = require('./tags/tag');
class Contacts {
    constructor(config) {
        this.user = new User(config);
        this.department = new Department(config);
        this.tag = new Tags(config);
        return this;
    }
}


module.exports = Contacts;