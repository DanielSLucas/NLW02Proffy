import React, { InputHTMLAttributes, useState, useCallback } from 'react';

import eyeIcon from '../../assets/images/icons/eye.svg';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  password?: boolean;
}

const CustomizedInput: React.FC<InputProps> = ({ name, placeholder, password, type,...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setinputType] = useState("password");

  const toggleShowPassowd = useCallback((event) => {
    setShowPassword(!showPassword);

    if (!showPassword) {
      setinputType("text")
    } else {
      setinputType("password")
    }

  }, [showPassword]);

  return (
    <div className="form__group field">
      <input 
        className="form__field" 
        placeholder={placeholder} 
        name={name}       
        type={ password ? inputType : type} 
        {...rest} 
      />
      <label htmlFor={name} className="form__label">{placeholder}</label>

      {password && (
        <button type="button" onClick={toggleShowPassowd} className="eye-button">
          { 
            showPassword
            ? <img src={eyeIcon} alt="Eye" />
            : <div className="closed-eye" />
          }       
        </button>
      )}
      
    </div>
      );
};

export default CustomizedInput;