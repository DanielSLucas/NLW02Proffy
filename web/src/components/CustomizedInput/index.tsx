import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  containerStyle?: object;
} 

const CustomizedInput: React.FC<InputProps> = ({ name, placeholder, ...rest }) => {
  return (
    <div className="form__group field">
      <input className="form__field" placeholder={placeholder} name={name} id={name} {...rest}/>
      <label htmlFor={name} className="form__label">{placeholder}</label>
    </div>
  );
};

export default CustomizedInput;