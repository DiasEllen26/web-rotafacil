import styled from "styled-components";

// Estilos utilizando styled-components
export const LoginContainer = styled.div`
    max-width: 300px;
    margin: 0 auto;
    margin-top: 250px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;

    div {
        margin-bottom: 15px;

        label {
            margin-bottom: 5px;
            display: block;
        }

        input {
            padding: 8px;
            border-radius: 3px;
            border: 1px solid #ccc;
            width: 100%;
        }
    }

    button {
        padding: 12px;
        border: none;
        border-radius: 5px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%; /* Definindo a largura do botão como 100% */

        &:hover {
            background-color: #0056b3;
        }
    }
`;

