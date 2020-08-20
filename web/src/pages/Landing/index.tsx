import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import signOutIcon from '../../assets/images/icons/sign-out.svg';

import api from '../../services/api';

import './styles.css';

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => setTotalConnections(response.data.total));
  }, [totalConnections]);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <header className="landing-header">
          <a href="" className="profile">
            <img
              src="https://scontent-gru1-1.xx.fbcdn.net/v/t1.0-1/p160x160/22490118_1492632757482874_519952030961978183_n.jpg?_nc_cat=100&_nc_sid=dbb9e7&_nc_ohc=OG5Rui2kHLQAX_U1S7_&_nc_ht=scontent-gru1-1.xx&_nc_tp=6&oh=4bf3c82d92c789354f44f6da056e4e79&oe=5F62EC96"
              alt="Lucas Santos"
            />
            <span>Lucas Santos</span>
          </a>

          <img src={signOutIcon} alt="Sign out" />
        </header>

        <div className="landing-mid">
          <div className="logo-container">
            <img src={logoImg} alt="Proffy" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>
          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </div>



        <div className="landing-bottomside">

          <div className="bottom-container">
            <div className="bottom-text">
              <p>
                Seja bem-vindo.
              <br />
                <strong>O que deseja fazer?</strong>
              </p>
              <span className="total-connections">
                Total de {totalConnections} conexões <br /> já realizadas <img src={purpleHeartIcon} alt="Coração roxo" />
              </span>
            </div>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>
              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aulas" />
                Dar aulas
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Landing;