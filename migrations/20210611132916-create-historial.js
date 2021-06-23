'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Historials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha_ingreso: {
        type: Sequelize.DATE
      },
      id_solicitud: {
        type: Sequelize.INTEGER
      },
      id_area: {
        type: Sequelize.INTEGER
      },
      id_empleado: {
        type: Sequelize.INTEGER
      },
      detalleRazon: {
        type: Sequelize.STRING
      },
      detalleRespuesta: {
        type: Sequelize.STRING
      },
      fecha_egreso: {
        type: Sequelize.DATE
      },
      id_estado: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Historials');
  }
};