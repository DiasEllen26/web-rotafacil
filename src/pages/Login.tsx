import React, { useState } from 'react';
import styled from 'styled-components';

// Estilos utilizando styled-components
const LoginContainer = styled.div`
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
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
        padding: 10px;
        border: none;
        border-radius: 3px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #0056b3;
        }
    }
`;




export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        console.log('Username:', username);
        console.log('Password:', password);
        // Adicione aqui a lógica para autenticar o usuário com as credenciais inseridas
    };

    return (
        <div>
            <LoginContainer>
                <h2>Login</h2>
                <Form>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button type="button" onClick={handleLogin}>
                        Login
                    </button>
                </Form>
            </LoginContainer>
        </div>
    );
}

export default Login;
