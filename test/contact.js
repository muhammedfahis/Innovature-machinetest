let chai = require('chai');
let chaiHttp =require('chai-http');
let server = require('../app');
var mongoose = require('mongoose');


//Assertion Style
chai.should();
chai.use(chaiHttp);


describe('Contact Apis', () => {
    /**
     * Test login
     */
    describe('POST /user/login',() => {
        it('It should login the user' , (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                   "email":"fahisccc@gmail.com",
                   "password":"Qwer@123"
                })
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('success');
                    response.body.should.have.property('message').eq('Login was success')
                done();
                });
        });
        //wrong password
        it('It should show Validation' , (done) => {
            chai.request(server)
                .post('/user/login')
                .send({
                   "email":"fahisccc@gmail.com",
                   "password":"Qwer"
                })
                .end((err,response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('failed')
                done();
                });
        })
    })

    /**
     * Test contact Creation
     */

     describe('POST /contact/register',() => {
        it('It should create new Contact' , (done) => {
            let data = getDatas();
            console.log(data,'@@@id')
            chai.request(server)
                .post('/contact/register')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .send(data)
                .end((err,response) => {
                    saveId(response.body._id);
                    console.log(getDatas(),'@@data');
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('Successfully registered')
                    response.body.should.have.property('status').eq('success')
                done();
                });
        });

        it('It should show validation Error and throw 400 status' , (done) => {
            let fakeData = getFakeData();
            chai.request(server)
                .post('/contact/register')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .send(fakeData)
                .end((err,response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                done();
                });
        });
    });

    /**
     * Test contact list
     */

     describe('GET /contact/getList',() => {
        it('It should list All contacts Created' , (done) => {
            chai.request(server)
                .get('/contact/getList')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data')
                done();
                });
        });

        it('It should show 401 unauthorized' , (done) => {
            chai.request(server)
                .get('/contact/getList')
                .end((err,response) => {
                    response.should.have.status(401);
                done();
                });
        });
    });

    /**
     * Test get single contact
     */

     describe('GET /contact/:id',() => {
        it('It should get a perticular contact' , (done) => {
            const contactId = getDatas()._id;
            chai.request(server)
                .get('/contact/' + contactId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('data').be.a('object');
                    response.body.should.have.property('data').have.a.property('_id');
                    response.body.should.have.property('data').have.a.property('firstName');
                    response.body.should.have.property('data').have.a.property('lastName');
                    response.body.should.have.property('data').have.a.property('email');
                    response.body.should.have.property('data').have.a.property('phone');
                    response.body.should.have.property('data').have.a.property('_id').eq(contactId);
                done();
                });
        });

        it('It should get Message no data with id and throw 400 status' , (done) => {
            const contactId = '2';
            chai.request(server)
                .get('/contact/' + contactId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .end((err,response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('No data with id');
                done();
                });
        });
    });

    /**
     * Test Update contact
     */

     describe('PUT /contact/update',() => {
        it('It should update a existing contact' , (done) => {
            chai.request(server)
                .put('/contact/update')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .send({
                  "id":getDatas()._id,
                  "firstName":"muhammed fayis",
                  "lastName": "cccc",
                  "email": "farz1234@gmail.com",
                  "phone": "8848104626",
                  "address":"cholakkal cheppala house",
                  "city": "tirur",
                  "state": "kerala",
                  "country": "India",
                  "zipCode": "66106"
                })
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('Successfully Updated');
                    response.body.should.have.property('status').eq('success');
                done();
                });
        });

        it('It should show validation Error and throw 400 status' , (done) => {
            chai.request(server)
                .put('/contact/update')
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .send({
                  "id":"638c4b0450902dd8c4eb782f",
                  "firstName":"muhammed fayis",
                  "lastName": "cccc",
                  "email": "farzzzzz",
                  "phone": "884810462653534",
                  "address":"cholakkal cheppala house",
                  "city": "tirur",
                  "state": "kerala",
                  "country": "India",
                  "zipCode": "66106"
                })
                .end((err,response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('status').eq('failed');
                done();
                });
        });
    });

    /**
     * Test contact delete
     */

     describe('DELETE /contact/:id',() => {
        it('It should Delete a perticular contact' , (done) => {
            const contactId = getDatas()._id;
            chai.request(server)
                .delete('/contact/' + contactId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .end((err,response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('Successfully Deleted');
                    response.body.should.have.property('status').eq('Success');
                done();
                });
        });

        it('It should get Message no data with id and throw 400 status' , (done) => {
            const contactId = '1';
            chai.request(server)
                .delete('/contact/' + contactId)
                .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZhaGlzY2NjQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGpscUQvdmRUbHVxdVZZUjQ0UU1vVmVaL2U3aEdiQ3QuYkJDYm1McWx3WFgvZzdRTFFtZ1VtIiwiX2lkIjoiNjJlMjQ3M2YyODdhMThkZGZiYzNmZGI0IiwiaWF0IjoxNjcwMDg0MTY1LCJleHAiOjE2NzAxNzA1NjV9.AFmsPMGzVSnDQJisnUdfPoR9crAeeRn856j-GjdNWfM')
                .end((err,response) => {
                    response.should.have.status(400);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('No data with id');
                done();
                });
        });
    });

});



let data = {
    "firstName":"muhammed fayis",
    "lastName": "cc",
    "email": "farz7645@gmail.com",
    "phone": "8848104626",
    "address":"cholakkal cheppala house",
    "city": "tirur",
    "state": "kerala",
    "country": "India",
    "zipCode": "66106"
}
let fakeData = {
    "email": "farz765@gmail.com",
    "phone": "8848104626",
    "address":"cholakkal cheppala house",
    "city": "tirur",
    "state": "kerala",
    "country": "India",
    "zipCode": "66106"
}
function getDatas() {
    return data;
}
function getFakeData() {
    return fakeData
}
function saveId(id) {
    data._id = id;
}

