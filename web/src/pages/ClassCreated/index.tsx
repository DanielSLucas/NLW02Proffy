 import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';
import Button from '../../components/Button';

const ClassCreated: React.FC = () => {
  const history = useHistory();

  const handleClick = useCallback(() => {
    history.push('/study');
  }, [history])
  
  return(
     <div id="page-success">
       <main className="success-container">
          <img src={successIcon} alt="Success check icon"/>
          <strong>Cadastro salvo!</strong>
          <p>
            Tudo certo, seu cadastro está na nossa lista de professores.
            <br/>
            Agora é só ficar de olho no seu WhatsApp.
          </p>

          <Button 
            type="button" 
            className="success-button"
            onClick={handleClick}
          >
            Acessar lista
          </Button>
       </main>
     </div>
  );
};

export default ClassCreated;