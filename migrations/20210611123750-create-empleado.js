'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleados', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_empleado: {
        type: Sequelize.NUMBER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.BIGINT
      },
      contraseña: {
        type: Sequelize.STRING
      },
      id_area: {
        type: Sequelize.NUMBER
      },
      id_estado: {
        type: Sequelize.NUMBER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empleados');
  }
};