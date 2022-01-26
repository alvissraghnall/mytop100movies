'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_prm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_prm.init({
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      references: { 
        model: 'user', 
        key: 'id'
      }  
    },
    prm: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'User_prm',
  });
  return User_prm;
};