const { DataTypes } = require('sequelize');

module.exports = sequelize => {
    // defino el modelo
    sequelize.define('diet', {
      name: {
        type: DataTypes.STRING,
      },
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      }
    });
  };