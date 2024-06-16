import { useState } from 'react';
import '../styles/home.css';
import FormCadastro from './CadastroFilme';
import ReadFilme from './readFilme';


function Home() {

const [secaoAtual, setSecaoAtual] = useState('home');

const cliqueSecao = (secao) => {
    setSecaoAtual(secao)
};

return(

<div>
        {secaoAtual == 'home' && (
        <>
        <div className="Container-home">
            <div className="texto-home">
                <h3> Bem-vindo ao CINEFLIX!</h3>
                <p>  Organize seus filmes de uma maneira ainda mais simples e do seu jeito! 😉 </p>
            </div>
            <div className="img-home">
                <img src="/home_img/movie.png" alt="Imagem de capa"/>
            </div>
            </div>
        <hr className="line"/>
        <div className="Container-home2">
  <span>Comece a diversão:</span>
  <div className="options">
    <button onClick={() => cliqueSecao('CadastroFilme')} className='botao-menu'> Adicionar filmes a minha lista </button>
    <button onClick={() => cliqueSecao('readFilme')} className='botao-menu'> Lista de filmes </button>
  </div>
</div>


        </>
        )}  
        <div>
            <div className='secao'>
                {secaoAtual === 'CadastroFilme' && <FormCadastro/>}
            </div>

            <div className='secao'>
                {secaoAtual ==='readFilme' && <ReadFilme />}
            </div>

          

        </div>
</div>


);
}
export default Home;

