'use strict';

const Http = require('./../../../baseService/baseClient');

class Department {

    constructor(config) {
        this.http = new Http(config, 'user');
    }

    //get department
    async list(departmentId) {
        return await this.http.httpGet('/cgi-bin/department/list', {
            id: departmentId,
        });
    }
    //delete department
    /**
     * 
     * @param {*number} departmentId 
     */
    async delete(departmentId) {
        return await this.http.httpGet('/cgi-bin/department/delete', {
            id: departmentId,
        });
    }

    /**
     * 
     * @param {*object} data 
     */
    async update(data) {
        if (data) {
            return await this.http.httpPost('/cgi-bin/department/update', data);
        } else {
            throw new Error('data is required.');
        }
    }

    //create department
    async create(data) {
        const department = await this.http.httpPost('/cgi-bin/department/create', data);

        return department;
    }
}

module.exports = Department;
