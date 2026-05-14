// src/models/EventoModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Evento = sequelize.define(
    "Evento",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Nome não pode ser vazio" },
                len: { args: [3, 255], msg: "Nome deve ter entre 3 e 255 caracteres" },
            },
        },
        descricao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfter: {
                    args: new Date().toISOString().split('T')[0], 
                    msg: "A data do evento não pode ser no passado",
                }
            }
        },
        local: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                notEmpty: { msg: "O local não pode ser vazio" }
            }
        },
        capacidade: {
            type: DataTypes.INTEGER,
            allowNull: true, 
            validate: {
                min: { args: [1], msg: "Capacidade deve ser pelo menos 1" },
            },
        },
        banner: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: { msg: "O banner deve ser uma URL válida" } 
            }
        },
    },
    {
        tableName: "eventos",
        timestamps: true,
        underscored: true, 
    },
);

module.exports = Evento;