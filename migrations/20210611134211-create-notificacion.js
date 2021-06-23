'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notificacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_notificacion: {
        type: Sequelize.INTEGER
      },
      fecha_ingreso_historial: {
        type: Sequelize.DATE
      },
      id_area: {
        type: Sequelize.INTEGER
      },
      id_solicitud: {
        type: Sequelize.INTEGER
      },
      motivo: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Notificacions');
  }
};