import { Aluno } from "../models/aluno.js";
import { Endereco } from "../models/endereco.js";
import { Router } from "express";

export const alunosRouter = Router();

alunosRouter.get("/", (req, res) => {
    res.send("Bem-vindo a CodeFitness!")
})

alunosRouter.get("/alunos", async (req, res) => {
    const listaAlunos = await Aluno.findAll();
    res.send(listaAlunos);
});

alunosRouter.get("/alunos/:id", async (req, res) => {
   
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

alunosRouter.post("/alunos", async (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    try {
    
        await Aluno.create(
            { nome, email, telefone, endereco },
            { include: [Endereco] },
        );
        res.json({ message: "Aluno criado com sucesso" });
    } catch (err) {
        res.status(500).json({ message: "Um erro ocorreu ao inserir aluno." })
    }
});

alunosRouter.put("/alunos/:id", async (req, res) => {
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

alunosRouter.delete("/alunos/:id", async (req, res) => {
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
});

