import { authenticate, connection } from "./config/database.js";
import { Aluno } from "./models/aluno.js";
import { Endereco } from "./models/endereco.js";
import { Treino } from "./models/treino.js";
import express from "express";

authenticate(connection).then(() => {
    connection.sync();
})

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Bem-vindo a CodeFitness!")
})

app.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.send(listaAlunos);
});

app.get("/alunos/:id", async (req, res) => {
   
    const aluno = await Aluno.findOne({
        where: { id: req.params.id },
        include: [Endereco]
    })
    if (aluno) {
        res.json(aluno);
    } else {
        res.status(404).json({ message: "Aluno não encontrado" });
    }
    
})

app.post("/alunos", async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    try {
        //Tentativa de inserir o cliente
        await Aluno.create(
            { nome, email, telefone, endereco },
            { include: [Endereco] },
        );
        res.json({ message: "Aluno criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Um erro ocorreu ao inserir aluno." })
    }
});

app.put("/alunos/:id", async (req, res) => {
    const idAluno = req.params.id;
    const { nome, email, telefone, endereco } = req.body

    try {
        const aluno = await Aluno.findOne({ where: { id: idAluno } });

        if (aluno) {   
            await Endereco.update(endereco, { where: { AlunoId: idAluno } })
            await aluno.update({ nome, email, telefone });
            res.json({ message: "Aluno atualizado." });
        } else {
            res.status(404).json({ message: "Aluno não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao atualizar o aluno." });
    }

});

app.delete("/alunos/:id", async (req, res) => {
    const idAluno = req.params.id;
    
    try {
        const aluno = await Aluno.findOne({ where: { id: idAluno } }); 

        if (aluno) {
            await aluno.destroy();
            res.json({message: "Aluno removido com sucesso."})

        } else {
            res.status(404).json({ message: "Aluno não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao excluir o aluno." });
    }
})


app.listen(3000, () => {
    console.log("Servidor rodando!")
})