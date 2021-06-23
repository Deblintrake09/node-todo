'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Lista,{foreignKey:"id_lista"});
      Item.belongsTo(models.Usuario,{foreignKey:"id_usuario"});
    }
  };
  Item.init({
    id: {
      type:DataTypes.INTEGER(),
      primaryKey:true,
      allowNull:false,
      unique:true,
      autoIncrement:true
    },
    titulo:  {
      type:DataTypes.STRING,
      allowNull:false,
    },
    descripcion: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    fecha_creacion: {
      type:DataTypes.DATE,
      allowNull:false,
    },
    fecha_limite: {
      type:DataTypes.DATE,
      allowNull:true,
    },
    fecha_resolucion: {
      type:DataTypes.DATE,
      allowNull:true,
    },
    prioridad: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"Baja"
    },
    estado: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:"Pendiente"
    },
    id_lista: {
      type:DataTypes.INTEGER,
      allowNull:true,
    },
    id_usuario:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName:"items",
    timestamps:false
  });
  return Item;
};