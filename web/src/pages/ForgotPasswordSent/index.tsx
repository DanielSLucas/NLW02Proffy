import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';
import Button from '../../components/Button';

const ForgotPasswordSent: React.FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('/');
  }, [history])
  
  return(
     <div id="page-success">
       <main className="success-container">
          <img src={successIcon} alt="Success check icon"/>
          <strong>Redefinição enviada!</strong>
          <p>
            Boa, agora é só checar o e-mail que foi enviado para você,
            <br/>
            redefinir sua senha e aproveitar os estudos.
          </p>

          <Button 
            type="button" 
            className="success-button"
            onClick={handleClick}
          >
            Voltar ao login
          </Button>
       </main>
     </div>
  );
};

export default ForgotPasswordSent;