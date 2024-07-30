import { config } from "dotenv";
config();

import { Sequelize } from "sequelize";

export const connection = new Sequelize( 
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

export async function authenticate(connection) {
    try {
        await connection.authenticate();
        console.log("Conexão foi feita com sucesso!");
    } catch (err) {
        console.log("Um erro aconteceu: ", err)
    }
}