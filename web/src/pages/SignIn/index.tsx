import React from 'react';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const SignIn: React.FC = () => {
  return (
    <div id="page-signin">
      <div className="intro-container">
        <div className="intro">
          <img src={logoImg} alt="Proffy" />
          <span>Sua plataforma de <br /> estudos online.</span>
        </div>
      </div>

      <div className="login-container">

        <form>
          <legend>Fazer login</legend>
          <input type="text" placeholder="Email"/>
          <input type="text" placeholder="Senha"/>
          <div>
            <input type="checkbox" name="" id=""/>
            Lembrar-me
            <a href="#">Esqueci minha senha</a>
          </div>
          <button>Entrar</button>
        </form>

        <footer>
          <div className="signup">
            <p>Não tem conta?</p>
            <a href="#">Cadastre-se</a>
          </div>
          <span>
            É de graça <img src={purpleHeartIcon} alt="Coração roxo" />
          </span>
        </footer>

      </div>
    </div>
  );
};

export default SignIn;