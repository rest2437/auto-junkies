"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Provider extends Model {
    static associate(models) {}
  }
  Provider.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [1, 99],
            msg: "Name must be between 1 and 99 characters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [8, 99],
            msg: "Password must be between 8 and 99 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Provider",
    }
  );

  Provider.addHook("beforeCreate", (pendingProvider) => {
    let hash = bcrypt.hashSync(pendingProvider.password, 12);
    pendingProvider.password = hash;
  });

  Provider.prototype.validPassword = function (typedPassword) {
    let isCorrectPassword = bcrypt.compareSync(typedPassword, this.password);

    return isCorrectPassword;
  };

  Provider.prototype.toJSON = function () {
    let providerData = this.get();
    delete providerData.password;

    return providerData;
  };

  return Provider;
};
