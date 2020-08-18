import React from 'react';

import successIcon from '../../assets/images/icons/success-check-icon.svg';

import './styles.css';
import Button from '../../components/Button';

const SignUpSuccess: React.FC = () => {
  return(
     <div id="page-success">
       <main className="success-container">
          <img src={successIcon} alt="Success check icon"/>
          <strong>Cadastro concluído</strong>
          <p>
            Agora você faz parte da plataforma Proffy.
            <br/>
            Tenha uma ótima experiência.
          </p>

          <Button type="button" className="success-button">Fazer login</Button>
       </main>
     </div>
  );
};

export default SignUpSuccess;