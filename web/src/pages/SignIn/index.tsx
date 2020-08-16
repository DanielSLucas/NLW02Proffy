import React, { useState, useEffect } from 'react';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

const SignIn: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!!email && !!password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);
  
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
          <CustomizedInput 
            type="text" 
            name="email"
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder="E-mail"
          />
          <CustomizedInput 
            type="password" 
            name="password"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            placeholder="Senha"
          />
          <div className="form-footer">
            <div className="rememberme">
              <input type="checkbox" name="" id=""/>
              Lembrar-me
            </div>
            <a href="#">Esqueci minha senha</a>
          </div>
          <Button  disabled={buttonDisabled} type="submit">Entrar</Button>
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