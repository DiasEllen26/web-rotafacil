// src/components/formulario/style.ts

import styled from 'styled-components';

export const ContainerContent = styled.div`
  max-width: 600px;
  margin: 20px auto 0;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #fff;
`;

export const Formulario = styled.form`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: bold;
  }
`;

export const InputFormulario = styled.input`
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
  }
`;

export const ButtonEnviarFormulario = styled.button`
  background-color: #199B91;
  color: white;
  padding: 12px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
