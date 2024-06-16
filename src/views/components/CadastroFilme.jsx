import React, { useState, useEffect } from 'react';
import '../styles/adicionar.css';
import { FaFilm, FaHome, FaPlus } from 'react-icons/fa';
import Home from './home';

function FormCadastro() {
  const [secaoAtual, setSecaoAtual] = useState('CadastroFilme');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=47e5b39f052bbba05d840fe3167ebc37&query=${searchTerm}&language=pt-BR`);
      if (!response.ok) {
        throw new Error(`Erro ao obter os dados: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error("Erro ao obter os detalhes do filme", err);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchMovieDetails();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleAddToList = async (movie) => {
    try {
      const response = await fetch('http://localhost:3000/filmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: movie.title,
          data_lancamento: movie.release_date,
          generos: movie.genres ? movie.genres.map(genre => genre.name).join(', ') : '',
          sinopse: movie.overview,
          url_poster: 'https://image.tmdb.org/t/p/w500' + movie.poster_path
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar a solicitação: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      setSuccessMessage(movie.id);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Erro ao adicionar o filme à lista", err);
      setErrorMessage('Erro ao adicionar o filme à lista. Por favor, tente novamente.');
    }
  };

  const cliqueSecao = (secao) => {
    setSecaoAtual(secao);
  };

  return (
    <div>
      {secaoAtual === 'CadastroFilme' && (
        <>
          <div className="Container_form">
            <div className="form">
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="input_container">
                <FaFilm className="input_icon" />
                <input
                  type="text"
                  name="search"
                  placeholder="Pesquisar filme"
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="filmes_container">
            {searchResults.map((movie, index) => (
              <div key={index} className="search_result">
                <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} />
                <div>
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>{movie.genres}</p>
                  <p>{movie.overview}</p>
                  <button onClick={() => handleAddToList(movie)}>
                    <FaPlus /> {successMessage === movie.id ? 'Adicionado com sucesso' : 'Adicionar à lista'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="home_voltar">
            <button className="button_home_voltar" onClick={() => cliqueSecao('home')}>
              <FaHome className="home_icon" />
            </button>
          </div>
        </>
      )}

      <div className='secao'>
        {secaoAtual === 'home' && <Home />}
      </div>
    </div>
  );
}

export default FormCadastro;





