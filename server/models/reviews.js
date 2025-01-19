"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Legătura cu utilizatorul (reviewer)
      this.belongsTo(models.User, {
        foreignKey: "idReviewer",
        as: "reviewer",
      });

      // Legătura cu articolul
      this.belongsTo(models.Article, {
        foreignKey: "idArticle",
        as: "article",
      });
    }
  }

  Review.init(
    {
      idReview: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      idArticle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Article",
          key: "idArticle",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idReviewer: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "idUser",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      timestamps: false,
    }
  );

  return Review;
};
