import { authenticate, connection } from "./config/database.js";
import express from "express";
import { alunosRouter } from "./routes/alunos.js";
import { treinosRouter } from "./routes/treinos.js";
import cors from "cors";

authenticate(connection).then(() => {
    connection.sync();
})

const app = express();

app.use(express.json());

app.use(cors({origin: "http://localhost:5173"}));

app.use(alunosRouter);
app.use(treinosRouter);


app.listen(3000, () => {
    console.log("Servidor rodando!")
})