'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      {
        tasks_users.belongsTo(models.user,
            {
                as: 'user',
                foreignKey: 'user_id',
            }
        );
        tasks_users.belongsTo(models.task,
            {
                as: 'task',
                foreignKey: 'task_id',
            }
        );
    };    }
  }
  tasks_users.init({
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tasks_users',
  });
  return tasks_users;
};