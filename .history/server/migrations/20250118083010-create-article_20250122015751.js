'use strict';
const StatusEnum = require('../utils/statusEnum');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('articles', {
      idArticle: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT('long'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          StatusEnum.PENDING,
          StatusEnum.NEEDS_REVISION,
          StatusEnum.REJECTED,
          StatusEnum.ACCEPTED
        ),
        defaultValue: StatusEnum.PENDING  
      },
      idAuthor: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'idUser',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      idReviewer1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "idUser",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      idReviewer2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "idUser",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('articles');
  }
};