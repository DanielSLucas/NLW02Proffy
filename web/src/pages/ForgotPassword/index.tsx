import React, { useState, useCallback, FormEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import CustomizedInput from '../../components/CustomizedInput';
import Button from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css';
import api from '../../services/api';

const ForgotPassword: React.FC = () => {
  const history = useHistory();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState('');

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      email,
    };

    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('forgot-password', data);

      history.push('forgot-password-sent');
    } catch (err) {
      alert(err.message);
    }
  }, [email, history])

  useEffect(() => {
    if (!!email) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email]); 

  return (
    <div id="page-forgot-password">
      <div className="forgot-password-container">
        <header className="forgot-password-header">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <legend>Eita, esqueceu <br/> sua senha?</legend>
          <span>Não esquenta, vamos dar um geito nisso.</span>
          <div id="form-input-border">
            <CustomizedInput
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="E-mail"
            />
          </div>
          <Button disabled={buttonDisabled} type="submit">Enviar</Button>
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

export default ForgotPassword;