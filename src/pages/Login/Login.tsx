
import { FormEvent } from 'react';
import { Form, LoginContainer } from './style';


export function Login() {

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const target = event.target as any
        const login = target.elements.login.value
        const senha = target.elements.senha.value

        // Adicione aqui a lógica para autenticar o usuário com as credenciais inseridas
    };

    return (
        <div>
            <LoginContainer>
                <h2>Login</h2>
                <Form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input
                            name='login'
                            type="text"
                            id="username"

                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            name='senha'
                            type="password"
                            id="password"
                        />
                    </div>
                    <button type="submit" >
                        Login
                    </button>
                </Form>
            </LoginContainer>
        </div>
    );
}

export default Login;
