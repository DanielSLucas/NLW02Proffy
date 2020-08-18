import React, { useState, useCallback, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senhas não conferem'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      alert(err.message);
    }
  }, [email, password, name, confirmPassword])

  return (
    <div id="page-signup">
      <div className="signup-container">
        <header className="signup-header">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </header>

        <form onSubmit={handleSignUp}>
          <legend>Cadastro</legend>
          <span>Preencha os dados abaixo <br /> para começar</span>
          <div id="form-input-border">
            <CustomizedInput
              type="text"
              name="nome"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nome"
            />
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
            <CustomizedInput
              type="password"
              name="confirm_password"
              password
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirme sua senha"
            />
          </div>
          <Button type="submit">Concluir cadastro</Button>
        </form>
      </div>

      <div className="intro-container">
        <div className="intro">
          <img src={logoImg} alt="Proffy" />
          <span>Sua plataforma de <br /> estudos online.</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;