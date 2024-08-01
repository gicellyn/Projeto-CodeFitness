import { Treino } from "../models/treino.js";
import { Aluno } from "../models/aluno.js";
import { Router } from "express";

export const treinosRouter = Router();

treinosRouter.get("/treinos", async (req, res) => {
    const listaTreinos = await Treino.findAll({ include: [Aluno] });
    res.send(listaTreinos);
});

treinosRouter.get("/treinos/:id", async (req, res) => {
    const treino = await Treino.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [{ model: Aluno, attributes: ["id", ["nome", "nomeAluno"]] }] 
    })

    if (treino) {
        res.json(treino);
    } else {
        res.status(404).json({ message: "Treino não encontrado" });
    }
});

treinosRouter.post("/treinos", async (req, res) => {
    const { tipo, exercicios, alunoId } = req.body;

    try {
        const aluno = await Aluno.findByPk(alunoId); 
        if (aluno) {
            await Treino.create({ tipo, exercicios, alunoId },
                res.json({ message: "Treino criado com sucesso" })
            );
        } else {
            res.status(404).json({ message: "Falha ao inserir treino. Aluno não encontrado." });
        }

    } catch (error) {
        res.status(500).json({ message: "Um erro ocorreu ao inserir treino." });
    }
});

treinosRouter.put("/treinos/:id", async (req, res) => {
    const { tipo, exercicios } = req.body;

    try {
        const treino = await Treino.findOne({ where: { id: req.params.id } });
        if (treino) {
            await treino.update({ tipo, exercicios });
            res.json({ message: "Treino atualizado com sucesso." });
        } else {
            res.status(404).json({ message: "Treino não encontrado." });
        }
    } catch (error) {
        res.status(500).json({ message: "Ocorreu um erro ao atualizar o treino." });
    }
});

treinosRouter.delete("/treinos/:id", async (req, res) => {

    try {
        const treino = await Treino.findByPk(req.params.id);

        if (treino) {
            await treino.destroy();
            res.json({ message: "Treino removido com sucesso." });
        } else {
            res.status(404).send({ message: "Treino não encontrado." });
        }
    } catch (err) {
        res.status(500).json({ message: "Ocorreu um erro ao excluir o treino." });
    }

});
