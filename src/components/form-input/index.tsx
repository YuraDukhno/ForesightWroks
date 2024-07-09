import React from 'react';

type FormInputProps = {
  label: string;
  type: string;
  name: string;
  required?: boolean;
};

export const FormInput: React.FC<FormInputProps> = ({ label, type, name, required = false }) => {
  return (
    <div>
      <label>
        {label}:
        <input type={type} name={name} required={required} />
      </label>
    </div>
  );
};