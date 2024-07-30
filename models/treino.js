// Tipo de treino
// id
// exercícios

import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

export const Treino = connection.define("treino", {
    tipo: { 
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    exercicios: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});