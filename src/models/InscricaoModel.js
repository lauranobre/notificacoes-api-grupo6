// src/models/InscricaoModel.js
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
    },
    {
        tableName: "inscricoes",
        timestamps: true,
        underscored: true,
    },
);

module.exports = Inscricao;