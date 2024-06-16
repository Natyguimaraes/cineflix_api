import "../styles/rodape.css";
import { FaLinkedin, FaGithub} from "react-icons/fa6";

function Rodape(){
    return (
        <div className="rodape">
            <nav> 
                <div className="secao_icons">
                    <div className="secao_icons2">
                <div className="icon">
                    <a href="https://www.linkedin.com/in/nat%C3%A1lia-santos-guimar%C3%A3es-a084a921a/" className="botao_redessociais">
                        <FaLinkedin className="img"/>
                    </a>
                </div>

                <div className="icon">
                    <a href="https://github.com/Natyguimaraes" className="botao_redessociais">
                    <FaGithub className="img" />
                    </a>
                </div>
                
                </div>

                <div className="copy">
                    <p> @Copyright 2024 CINEFLIX. Todos os direitos reservdos. </p>
                </div>

                </div>
                
                
            </nav>
        </div>
    );
}

export default Rodape;