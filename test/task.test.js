const index = require("../index");
const expect = require('chai').expect;
const request = require('supertest');

const mongoose = require("mongoose");



describe('Post task', () => {

    before((done)=>{
        done();
    })

    after((done)=>{
        done();
    })

 it('OK , creating a new task work', (done) => {
     request(index).post('/task')
     .send({name: 'Task name', type: 'Office Task', date:'2021-01-23T00:00:00.000+00:00', details:'Initial task'})
     .then((res)=>{
        const body = res.request._data;
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('type');
        expect(body).to.contain.property('date');
        expect(body).to.contain.property('details');
        done();
     }).catch(done);
    });

});

