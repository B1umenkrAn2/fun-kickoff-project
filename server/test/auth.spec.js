const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const server = app.server
chai.should();
chai.use(chaiHttp);
const api = chai.request(server).keepOpen()

console.log("Test start.")

// should run a delete user after this method.
describe("/ register user test", () => {
    it("it should return 201 and an user json", (done) => {
        chai
            .request(server)
            .post(`/auth/register`)
            .send({username:"user002",email: "user002@qq.com", password: "password"})
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object')
                res.body.should.have.property('success')
                chai.expect(res.body.success.user.email).to.eql('user002@qq.com')
                chai.expect(res.body.success.user.username).to.eql('user002')
                chai.expect(res.body.success.user.email).to.eql('user002@qq.com')
                done();
            });
    });
});

describe("/ login user test", () => {
    it("it should return 200 and an user json", (done) => {
        api
            .post(`/auth/login`)
            .send({email: "qq@qq.com", password: "Qwer1234"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('success')
                chai.expect(res.body.success.user.email).to.eql('qq@qq.com')
                chai.expect(res.body.success.user.username).to.eql('qq')

                done();
            });
    });
});

// can't get cookie in this method.
describe("/ get user data test", () => {
    it("it should return 200 and a success json with userdata  ", (done) => {
        api
            .post('/auth/login')
            .send({email: "qq@qq.com", password: "Qwer1234"})
            .then(function (res) {
                // chai.expect(res).to.have.cookie('token');
                // The `agent` now has the sessionid cookie saved, and will send it
                // back to the server in the next request:
                return api.get('/auth/user')
                    .then(function (res) {
                        chai.expect(res).to.have.status(200);
                    });
            });
    })
})
// can't get cookie in this method.
describe("/ logout test", () => {
    it("it should return 200 and logout message ", (done) => {
        chai.request(server)
            .post('/auth/login')
            .send({email: "qq@qq.com", password: "Qwer1234"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object')
                res.body.should.have.property('success')
                chai.expect(res.body.success.user.email).to.eql('qq@qq.com')
                res.should.have.cookie("token")
                chai.request(server)
                    .post('/auth/logout')
                    .send({})
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.text.should.eql("You have successfully logged out")
                        chai.expect(res).to.not.have.cookie("token")
                    })

                done()
            })
    })
})
