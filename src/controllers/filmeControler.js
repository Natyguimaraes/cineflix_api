import { create, read, update, deleteFil } from '../models/filmeModel.js';

// Adicionar um novo filme
export async function createFilme(req, res) {
    const { titulo, data_lancamento, generos, sinopse, url_poster } = req.body;
    console.log('Dados recebidos do frontend:', { titulo, data_lancamento, generos, sinopse, url_poster });

    try {
        const result = await create(titulo, data_lancamento, generos, sinopse, url_poster);
        res.status(201).json({ mensagem: 'Filme adicionado com sucesso', data: result });
    } catch (err) {
        console.error('Erro ao adicionar filme:', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
}

// Consultar todos os filmes
export async function getAllFilmes(req, res) {
    read((err, filmes) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(filmes);
    });
}

// Consultar um filme específico
export async function getFilme(req, res) {
    const { id } = req.params;
    read(id, (err, filme) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!filme) {
            res.status(404).json({ error: 'Filme não encontrado' });
            return;
        }
        res.json(filme);
    });
}

// Atualizar um filme
export async function updateFilme(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    update(id, novosDados, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nenhum filme encontrado para atualizar.' });
            return;
        }

        res.status(200).json({ message: 'Filme atualizado com sucesso' });
    });
}

// Excluir um filme
export async function deleteFilme(req, res) {
    const { id } = req.params;
    console.log('ID recebido para exclusão:', id);

    deleteFil(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Filme não encontrado para exclusão.' });
            return;
        }
        res.status(200).json({ message: 'Filme excluído com sucesso' });
    });
}

