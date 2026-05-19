const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Inscricao = sequelize.define(
  "Inscricao",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    dataInscricao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    status: {
      type: DataTypes.ENUM("pendente", "confirmada", "cancelada"),
      allowNull: false,
      defaultValue: "pendente",
    },

    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    participante_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "inscricoes",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Inscricao;