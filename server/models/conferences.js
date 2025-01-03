'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conferences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey: 'idOrganizer',
        as: 'organizer',
      })
    }
  }
  Conferences.init({
    idConference: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, 
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    date:{ 
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    idOrganizer: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Conference',
    tableName: 'conferences',
  });
  return Conferences;
};