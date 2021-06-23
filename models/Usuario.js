'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.hasMany(models.Lista, {foreignKey:'id_usuario'});
      Usuario.hasMany(models.Item, {foreignKey:'id_usuario'});
    }
  };
  Usuario.init({
    id: {
      type:DataTypes.INTEGER(),
      primaryKey:true,
      allowNull:false,
      unique:true,
      autoIncrement:true
    },
    nombre:  {
      type:DataTypes.STRING,
      allowNull:false,
    },
    email:  {
      type:DataTypes.STRING,
      unique: true,
      allowNull:false,
    },
    contraseña:{
      type:DataTypes.STRING,
      allowNull:false,
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName:"usuarios",
  });
  return Usuario;
};