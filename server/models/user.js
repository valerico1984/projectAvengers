'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
  }
  user.init({
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},

    
    userName: {
      allowNull: false,
      type: DataTypes.STRING},
    
     password: {
        allowNull: false,
        type: DataTypes.CHAR}
        ,
    email: {
      allowNull: false,
      type: DataTypes.STRING},

    
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};