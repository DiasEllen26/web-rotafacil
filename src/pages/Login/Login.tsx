import logo from "../../imagens/logo.png";
import { FormEvent, useRef } from 'react';
import { ContainerContent, LoginButton, LoginContainer, LoginForm, LoginInput, Logo } from './style';

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
		<>
		<LoginContainer>
      <ContainerContent>
				<LoginForm>
					<Logo src={logo} />
					<LoginInput type="text" name="login" placeholder="login" />
					<LoginInput type="password" name="senha" placeholder="Senha" />
					<LoginButton type="submit">Entrar</LoginButton>
				</LoginForm>
			</ContainerContent>
    </LoginContainer>

		</>
  );
}

export default Login;
