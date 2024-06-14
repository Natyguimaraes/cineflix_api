import React, { useState } from 'react';
import '../styles/App.css';
import Home from '../components/home';
import ReadFilme from './readFilme';

function UpdateFilme() {
  const [secaoAtual, setSecaoAtual] = useState('updateFilme');
  const [formValores, setFormValores] = useState({
    id: '',
    titulo: '',
    diretor: '',
    ano_lancamento: '',
    genero: '',
    sinopse: '',
    poster_url: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValores((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Dados a serem enviados: ", formValores);
      const response = await fetch(`http://localhost:3000/filmes/${formValores.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValores)
      });

      const json = await response.json();
      console.log(response);
      console.log(json);
    } catch (err) {
      console.error("Erro ao enviar", err);
    }
  };

  const cliqueSecao = (secao) => {
    setSecaoAtual(secao);
  };

  return (
    <>
      <div>
        {secaoAtual === 'updateFilme' && (
          <>
            <div className="Container_form">
              <div className="form">
                <h1>Atualização de Registro</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form_row">
                    <div className="div_dados">
                      <div className="input_container">
                        <label htmlFor="id">ID a ser atualizado:</label>
                        <input
                          type="text"
                          id="id"
                          name="id"
                          value={formValores.id}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="titulo">Título:</label>
                        <input
                          type="text"
                          id="titulo"
                          name="titulo"
                          value={formValores.titulo}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="diretor">Diretor:</label>
                        <input
                          type="text"
                          id="diretor"
                          name="diretor"
                          value={formValores.diretor}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="ano_lancamento">Ano de Lançamento:</label>
                        <input
                          type="text"
                          id="ano_lancamento"
                          name="ano_lancamento"
                          value={formValores.ano_lancamento}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="genero">Gênero:</label>
                        <input
                          type="text"
                          id="genero"
                          name="genero"
                          value={formValores.genero}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="sinopse">Sinopse:</label>
                        <input
                          type="text"
                          id="sinopse"
                          name="sinopse"
                          value={formValores.sinopse}
                          onChange={handleChange} />
                      </div>
                      <div className="input_container">
                        <label htmlFor="poster_url">URL do Poster:</label>
                        <input
                          type="text"
                          id="poster_url"
                          name="poster_url"
                          value={formValores.poster_url}
                          onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                  <button type="submit">ATUALIZAR</button>
                </form>
              </div>
            </div>
            <div className="home_voltar">
              <button className="button_home_voltar" onClick={() => cliqueSecao('readFilme')}> Voltar à página inicial </button>
            </div>
          </>
        )}
      </div>

      <div className='secao'>
        {secaoAtual === 'readFilme' && <ReadFilme />}
      </div>
    </>
  );
}

export default UpdateFilme;
