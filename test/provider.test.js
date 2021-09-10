const expect = require("chai").expect;
const db = require("../models");
const { Provider } = require("../models");

before(function (done) {
  db.sequelize.sync({ force: true }).then(function () {
    done();
  });
});

describe("Creating a Provider", function () {
  it("should create successfully", function (done) {
    Provider.create({
      mail: "test@test.co",
      name: "Muttbuncher",
      password: "password",
    })
      .then(function () {
        done();
      })
      .catch(function (error) {
        done(error);
      });
  });

  it("should throw an error on invalid email addresses", function (done) {
    Provider.create({
      email: "test",
      name: "Brian",
      password: "password",
    })
      .then(function (newProvider) {
        done(newProvider);
      })
      .catch(function (error) {
        done();
      });
  });

  it("should throw an error on invalid name", function (done) {
    Provider.create({
      email: "test@test.co",
      name: "",
      password: "password",
    })
      .then(function (newProvider) {
        done(newProvider);
      })
      .catch(function (error) {
        done();
      });
  });

  it("should throw an error on invalid password", function (done) {
    Provider.create({
      email: "test@test.co",
      name: "Brian",
      password: "short",
    })
      .then(function (newProvider) {
        done(newProvider);
      })
      .catch(function (error) {
        done();
      });
  });

  it("should hash the password before save", function (done) {
    Provider.create({
      email: "test@test.co",
      name: "Muttbuncher",
      password: "password",
    })
      .then(function (newProvider) {
        if (newProvider.password === "password") {
          done(newProvider);
        } else {
          done();
        }
      })
      .catch(function (error) {
        done(error);
      });
  });
});

describe("Provider instance methods", function () {
  describe("validPassword", function () {
    it("should validate a correct password", function (done) {
      Provider.findOne()
        .then(function (provider) {
          if (provider.validPassword("123123123")) {
            done();
          } else {
            done(provider);
          }
        })
        .catch(function (error) {
          done(error);
        });
    });

    it("should invalidate an incorrect password", function (done) {
      Provider.findOne()
        .then(function (provider) {
          if (!provider.validPassword("nope")) {
            done();
          } else {
            done(provider);
          }
        })
        .catch(function (error) {
          done(error);
        });
    });
  });

  describe("toJSON", function () {
    it("should return a provider without a password field", function (done) {
      Provider.findOne()
        .then(function (provider) {
          if (provider.toJSON().password === undefined) {
            done();
          } else {
            done(provider);
          }
        })
        .catch(function (error) {
          done(error);
        });
    });
  });
});
