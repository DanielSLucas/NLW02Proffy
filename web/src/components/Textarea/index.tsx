import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, maxLength,...rest }) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <span>(Máximo de {maxLength} caracteres)</span>
      <textarea id={name} maxLength={maxLength} {...rest} />
    </div>
  );
}

export default Textarea;