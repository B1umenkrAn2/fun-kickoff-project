const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const server = app.server
chai.should();
chai.use(chaiHttp);

console.log("test start")

describe("/POST ping", () => {
    it("it should return 200 and message", (done) => {
        chai
            .request(app)
            .post(`/ping/`)
            .send({message: "hello"})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have
                    .property("response")
                    .eql("Server is running. Message received: hello");
                done();
            });
    });
});


describe("/ ping", () => {
    it("it should return 200 and a string", (done) => {
        chai
            .request(server)
            .get(`/`)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.eql("API is running")
                done();
            });
    });
});

describe("/ login", () => {
    it("it should return 200 and a success json with userdata  ", (done) => {
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
                    .end((err,res)=>{
                        res.should.have.status(200);
                        res.text.should.eql("You have successfully logged out")
                        chai.expect(res).to.not.have.cookie("token")
                    })

                done()
            })
    })
})
