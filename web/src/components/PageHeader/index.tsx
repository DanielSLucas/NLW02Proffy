import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

import './styles.css'

interface PageHeaderProps {
  title: string;
  description?: string
  icon?: string;
  span?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children, icon, span }) => {
  return (
    <header className="page-header">
      <div className="top-bar">
        <div className="top-bar-container">
          <Link to="/">
            <img src={backIcon} alt="Voltar" />
          </Link>
          <img src={logoImg} alt="Proffy" />
        </div>
      </div>

      <div className="header-content">
        <strong>{title}</strong>

        <div className="header-description">
          {description && <p>{description}</p>}
          
          { span && (
            <div className="span">
              <img src={icon} alt={span}/>
              <span>{span}</span>
            </div>
          )}

        </div>
        {children}
      </div>
    </header>
  );
}

export default PageHeader;