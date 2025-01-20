'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ConferenceReviewer extends Model {
    static associate(models) {
      this.belongsTo(models.Conference, {
        foreignKey: 'idConference',
        as: 'conference'
      });

      this.belongsTo(models.User, {
        foreignKey: 'idUser',
        as: 'reviewer'
      });
    }
  }

  ConferenceReviewer.init({
    idConference: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    idReviewer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'ConferenceReviewer',
    tableName: 'conferences_reviewers', 
    timestamps: false, 
  });

  return ConferenceReviewer;
};
