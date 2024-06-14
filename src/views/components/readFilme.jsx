import React, { useState, useEffect } from 'react';
import '../styles/read.css';
import Home from './home';
import { FaTrash, FaEdit } from 'react-icons/fa'; 

function ReadFilme() {
  const [secaoAtual, setSecaoAtual] = useState('readFilme');
  const [dadosCadastrados, setDadosCadastrados] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  useEffect(() => {
    async function fetchDadosCadastrados() {
      try {
        const response = await fetch('http://localhost:3000/filmes');
        if (!response.ok) {
          throw new Error(`Erro ao obter os dados: ${response.status}`);
        }
        const dados = await response.json();
        setDadosCadastrados(dados);
      } catch (err) {
        console.error("Erro ao obter os dados cadastrados", err);
      }
    }
    fetchDadosCadastrados();
  }, []);

  const handleDelete = async (e, movie) => {
    e.preventDefault();

    try {
      console.log("ID a ser deletado:", movie.id);
      const response = await fetch(`http://localhost:3000/filmes/${movie.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Erro ao excluir filme: ${response.status}`);
      }
      const updatedData = dadosCadastrados.filter(item => item.id !== movie.id);
      setDadosCadastrados(updatedData);
    } catch (error) {
      console.error('Erro ao excluir filme:', error);
    }
  };

  const handleUpdate = async (index) => {
    try {
      const filme = dadosCadastrados[index];
      const response = await fetch(`http://localhost:3000/filmes/${movie.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw new Error(`Erro ao atualizar filme: ${response.status}`);
      }
      // Recarrega os dados após a atualização bem-sucedida
      const updatedData = [...dadosCadastrados];
      setDadosCadastrados(updatedData);
      setEditIndex(null);
    } catch (error) {
      console.error('Erro ao atualizar filme:', error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...dadosCadastrados];
    newData[index] = {
      ...newData[index],
      [name]: value
    };
    setDadosCadastrados(newData);
  };

  return (
    <div>
      {secaoAtual === 'readFilme' && (
        <>
          <div className="container_tabela">
            <h1 className="h1_visualizacao"> SUA LISTA DE FILMES </h1>
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Data de Lançamento</th>
                  <th>Gêneros</th>
                  <th>Sinopse</th>
                  <th>URL do Poster</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {dadosCadastrados.map((movie, index) => (
                  <tr key={index}>
                    <td>{movie.id}</td>
                    <td>{editIndex === index ? <input type="text" name="titulo" value={movie.titulo} onChange={(e) => handleChange(e, index)} /> : movie.titulo}</td>
                    <td>{editIndex === index ? <input type="text" name="data_lancamento" value={movie.data_lancamento} onChange={(e) => handleChange(e, index)} /> : movie.data_lancamento}</td>
                    <td>{editIndex === index ? <input type="text" name="generos" value={movie.generos} onChange={(e) => handleChange(e, index)} /> : movie.generos}</td>
                    <td>{editIndex === index ? <input type="text" name="sinopse" value={movie.sinopse} onChange={(e) => handleChange(e, index)} /> : movie.sinopse}</td>
                    <td>{editIndex === index ? <input type="text" name="url_poster" value={movie.url_poster} onChange={(e) => handleChange(e, index)} /> : movie.url_poster}</td>
                    <td>
                    <FaTrash onClick={(e) => handleDelete(e, filme)} />
{editIndex === index ?
  <button className="salvar-button" onClick={() => handleUpdate(index)}>Salvar</button> :
  <FaEdit onClick={() => handleEdit(index)} />
}

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="home_voltar2">
            <button className="button_home_voltar" onClick={() => setSecaoAtual('home')}> Voltar a página inicial </button>
          </div>
        </>
      )}

      <div className='secao'>
        {secaoAtual === 'home' && <Home />}
      </div>
    </div>
  );
}

export default ReadFilme;
