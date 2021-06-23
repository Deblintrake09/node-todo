'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lista.belongsTo(models.Usuario,{foreignKey:"id_usuario"});
      Lista.hasMany(models.Item,{foreignKey:"id_lista"});
    }
  };
  Lista.init({
    id: {
      type:DataTypes.INTEGER(),
      primaryKey:true,
      allowNull:false,
      unique:true,
      autoIncrement:true
    },
    id_usuario:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    titulo:  {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fecha_creacion: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    fecha_resolucion: {
      type:DataTypes.DATE,
      allowNull:true,
    },
    estado: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"Pendiente"
    },
    
  }, {
    sequelize,
    modelName: 'Lista',
    tableName:"listas",
    timestamps:false,
  });
  return Lista;
};