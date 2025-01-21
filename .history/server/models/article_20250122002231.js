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
        type: Sequelize.ENUM(
          StatusEnum.PENDING,
          StatusEnum.NEEDS_REVISION,
          StatusEnum.REJECTED,
          StatusEnum.ACCEPTED
        ),
        defaultValue: statusEnum.PENDING,
      },
      idReviewer1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      idReviewer2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
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
