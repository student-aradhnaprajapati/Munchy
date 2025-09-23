const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Mess = sequelize.define("Mess", {
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  distance_km: { type: DataTypes.DECIMAL },
  rating: { type: DataTypes.DECIMAL, defaultValue: 0 },
});

module.exports = Mess;
