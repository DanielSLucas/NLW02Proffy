import React, { InputHTMLAttributes } from 'react';
import InputMask from 'react-input-mask';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  isTel?: boolean;
}

const Input: React.FC<InputProps> = ({ label, name, isTel,...rest }) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>

      { isTel
        ? (<InputMask mask="(99) 9 9999-9999" type="tel" id={name} {...rest} />)
        : (<input type="text" id={name} {...rest} />)
      }
      
    </div>
  );
}

export default Input;