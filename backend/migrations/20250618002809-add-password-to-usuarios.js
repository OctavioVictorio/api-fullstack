"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar columna 'password' a la tabla 'Usuarios'
    await queryInterface.addColumn("Usuarios", "password", {
      type: Sequelize.STRING,
      allowNull: false, // si querés que sea obligatorio
      defaultValue: "", // o podés poner null y allowNull: true si querés
    });
  },

  async down(queryInterface, Sequelize) {
    // Para revertir, eliminar la columna 'password'
    await queryInterface.removeColumn("Usuarios", "password");
  },
};
