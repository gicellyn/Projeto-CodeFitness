import { authenticate, connection } from "./config/database.js";
import express from "express";
import { alunosRouter } from "./routes/alunos.js";
import { treinosRouter } from "./routes/treinos.js";

authenticate(connection).then(() => {
    connection.sync();
})

const app = express();

app.use(express.json());

app.use(alunosRouter);
app.use(treinosRouter);


app.listen(3000, () => {
    console.log("Servidor rodando!")
})