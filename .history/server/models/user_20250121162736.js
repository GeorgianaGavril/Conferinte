"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Conference, {
        foreignKey: "idOrganizer",
        as: "organizedConferences",
      });

      this.hasMany(models.Review, {
        foreignKey: "idReviewer",
        as: "reviews",
      });

      this.belongsToMany(models.Conference, {
        through: 'ConferenceReviewer',
        foreignKey: 'idUser',
        otherKey: 'idConference',
        as: 'conferences'
      });

      this.hasMany(models.Article,{
        foreignKey: 'idAuthor',
        as: 'articles'
      });

    }
  }
  User.init(
    {
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: false,
    }
  );

  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
