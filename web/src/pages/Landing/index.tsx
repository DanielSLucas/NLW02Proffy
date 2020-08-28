import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import signOutIcon from '../../assets/images/icons/sign-out.svg';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import './styles.css';

function Landing() {
  const { user, signOut } = useAuth()
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get('connections').then(response => setTotalConnections(response.data.total));
  }, [totalConnections]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut])

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <header className="landing-header">
          <Link to="Profile" className="profile">
            { user.avatar && (
              <img
              src={user.avatar_url}
              alt={user.name}
              />
            )}
            <span>{user.name}</span>
          </Link>

          <button onClick={handleSignOut}>
            <img src={signOutIcon} alt="Sign out" />
          </button>
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