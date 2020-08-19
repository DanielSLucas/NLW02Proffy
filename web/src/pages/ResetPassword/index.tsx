import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';

import './styles.css';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!!password && !!confirmPassword) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [confirmPassword, password]);

  const handleSignIn = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      password,
      confirm_password: confirmPassword,
    };

    try {
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        confirm_password: Yup.string().oneOf(
          [Yup.ref('password'), undefined],
          'Senhas não conferem'
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const token = location.search.replace('?token=', '');

      if (!token) {
        throw new Error();
      }

      await api.patch('reset-password', {
        ...data,
        token,
      });

      history.push('/')
    } catch (err) {
      alert(err.message);
    }
  }, [password, confirmPassword, location.search, history])

  return (
    <div id="page-reset-password">
      <div className="intro-container">
        <div className="intro">
          <img src={logoImg} alt="Proffy" />
          <span>Sua plataforma de <br /> estudos online.</span>
        </div>
      </div>

      <div className="reset-password-container">

        <form onSubmit={handleSignIn}>
          <legend>Redefina sua senha</legend>
          <div id="form-input-border">
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
          <Button disabled={buttonDisabled} type="submit">Redefinir senha</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;