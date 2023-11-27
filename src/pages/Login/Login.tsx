
import { FormEvent, useRef } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const LeftSection = styled.div`
    flex: 1;
    position: relative;
`;

const BackgroundImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const RightSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const LoginLogo = styled.img`
    width: 150px;
    height: 150px;
    position: absolute;
    top: 60px;
`;

const FormContainer = styled.form`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-top: 50px;
    width: 300px;
`;
export function Login() {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const handleLogin = (event: FormEvent<HTMLFormElement>) => {
			event.preventDefault();

			if (usernameRef.current && passwordRef.current) {
					const login = usernameRef.current.value;
					const senha = passwordRef.current.value;


			}
		};
    return (
        <div>
            <LoginContainer>

						<LeftSection>
                <BackgroundImage src="../src/images/img-login.png" alt="Imagem" />
            </LeftSection>

						<RightSection>
                <LoginLogo src="../src/images/logo-login.png" alt="Logo" />

                <h2>Login</h2>
                <FormContainer onSubmit={handleLogin}>
                    <div className='users'>
                        <label htmlFor="username">Username:</label>
                        <input
                            name='login'
                            type="text"
                            id="username"
														ref={usernameRef}

                        />
                    </div>
                    <div className='users'>
                        <label htmlFor="password">Password:</label>
                        <input
                            name='senha'
                            type="password"
                            id="password"
														ref={passwordRef}
                        />
                    </div>
                    <button type="submit" >
                        Login
                    </button>
                </FormContainer>
								</RightSection>
            </LoginContainer>
        </div>
    );
}

export default Login;
