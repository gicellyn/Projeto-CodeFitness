import { authenticate, connection } from "./config/database.js";
import { Aluno } from "./models/aluno.js";
import { Endereco } from "./models/endereco.js";
import { Treino } from "./models/treino.js";

authenticate(connection).then(() => {
    connection.sync();
})