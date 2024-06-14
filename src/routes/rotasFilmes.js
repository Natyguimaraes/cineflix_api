import express from 'express'
const app = express();
import cors from "cors";
import { getAllFilmes, getFilmesF, createFilme, updateFilme, deleteFilme } from "../controllers/filmeControler.js";


app.use(express.json());
app.use(cors());

app.get('/filmes', getAllFilmes);
app.get('/filmes/:id', getFilmesF)
app.post('/filmes', createFilme);
app.put('/filmes/:id', updateFilme);
app.delete('/filmes/:id', deleteFilme);

app.listen(3000, () => {
    console.log(`Servidor rodando com sucesso na porta 3000`);
});