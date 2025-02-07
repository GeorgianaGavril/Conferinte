"use strict";
const statusEnum = require("../utils/statusEnum");
const StatusEnum = require("../utils/statusEnum");
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "idAuthor",
        as: "author",
      });


      this.belongsTo(models.Conference, {
        foreignKey: "idConference",
        as: "conferenceArticle",
    });
    

      this.hasMany(models.Review, {
        foreignKey: "idArticle",
        as: "reviews",
      });
    }
  }
  Article.init(
    {
      idArticle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          StatusEnum.PENDING,
          StatusEnum.NEEDS_REVISION,
          StatusEnum.REJECTED,
          StatusEnum.ACCEPTED
        ),
        defaultValue: statusEnum.PENDING,
      },
      idAuthor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "idUser",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idConference:{
        type: DataTypes.INTEGER,
        references: {
          model: "conferences",
          key: "idConference",
        }
      }
    },
    {
      sequelize,
      modelName: "Article",
      tableName: "articles",
      timestamps: false,
    }
  );
  return Article;
};
