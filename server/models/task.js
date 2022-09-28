

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      {
        task.belongsTo(models.user,
            {
                as: 'user',
                foreignKey: 'userId',
            }
        );

  };
     }
    }
  task.init({
    id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
      
		},
   
    description: {
      allowNull: true,
      type: DataTypes.TEXT},

    status: {
      allowNull: false,
      type: DataTypes.STRING},

    importance: {
      allowNull: false,
      type: DataTypes.STRING},
      
    title: {
      allowNull: false,
      type: DataTypes.STRING},

      
      userName: {
    allowNull: false,
    type: DataTypes.STRING},
      },
      {
    sequelize,
    modelName: 'task',
  });
  return task;
};