import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';

const SignIn: React.FC = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (!!email && !!password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password]);
  
  const handleSignIn = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
      password,
      rememberMe
    };

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'A senha deve ter no mínimo 6 dígitos'),
        rememberMe: Yup.boolean(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      alert(err.message);
    }
  }, [email, password, rememberMe])

  return (
    <div id="page-signin">
      <div className="intro-container">
        <div className="intro">
          <img src={logoImg} alt="Proffy" />
          <span>Sua plataforma de <br /> estudos online.</span>
        </div>
      </div>

      <div className="login-container">

        <form onSubmit={handleSignIn}>
          <legend>Fazer login</legend>
          <div id="form-input-border">
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
              password
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Senha"
            />
          </div>
          <div className="form-footer">
            <div className="rememberme">
              <input 
                type="checkbox" 
                name="rememberme"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}                 
              />
              Lembrar-me
            </div>
            <a href="#">Esqueci minha senha</a>
          </div>
          <Button  disabled={buttonDisabled} type="submit">Entrar</Button>
        </form>

        <footer>
          <div className="signup">
            <p>Não tem conta?</p>
            <Link to="signup">Cadastre-se</Link>
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