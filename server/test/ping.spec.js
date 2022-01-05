const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const server = app.server
chai.should();
chai.use(chaiHttp);

describe("/POST ping", () => {
  it("it should return 200 and message", (done) => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ message: "hello" })
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
            .post(`/`)
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.eql("API is running")
                done();
            });
    });
});
