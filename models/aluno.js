// aluno-treino (1:N)
// aluno-endereço (1:1)
import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Endereco } from "./endereco.js";
import { Treino } from "./treino.js";

export const Aluno = connection.define("aluno", {
    nome: { 
        type: DataTypes.STRING(130), 
        allowNull: false, 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
})

Aluno.hasOne(Endereco, {onDelete: "CASCADE"});
Endereco.belongsTo(Aluno);

Aluno.hasMany(Treino, {onDelete: "CASCADE"});
Treino.belongsTo(Aluno);