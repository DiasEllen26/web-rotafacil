import logo from "../../imagens/logo.png";
import { FormEvent, useRef, useState } from 'react';
import { ContainerContent, LoginButton, LoginContainer, LoginForm, LoginInput, Logo } from './style';
import { findByAttribute } from "../../utils/firebase/findByAttribute";
import { IGestor } from "../../types/IGestor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../../components/Loading/Loading";


export function Login() {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isLoading, setLoading] = useState<boolean>(false);

	const { login } = useAuth()

	const navigate = useNavigate()

	async function criptografarSenha(senha: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(senha);

		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

		return hashHex;
	}


	const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (usernameRef.current && passwordRef.current) {
			const loginInput = usernameRef.current.value;
			const senhaInput = passwordRef.current.value;
			setLoading(true)
			const user = await findByAttribute('gestor', "login", loginInput) as IGestor | null;
			setLoading(false)
			if(!user){
				Swal.fire({
					icon: "error",
					title: "Erro",
					text: "Usuario ou senha não inválidos,"
				});
				return
			}

			const senhaCrypted = await criptografarSenha(senhaInput)

			if(senhaCrypted !== user.senha){
				Swal.fire({
					icon: "error",
					title: "Erro",
					text: "Usuario ou senha não inválidos,"
				});
				return
			}

			login()
			navigate('/gestor')
		}
	};

	return (
		<>
		<Loading visible={isLoading} />
		<LoginContainer>
      <ContainerContent>
				<LoginForm onSubmit={handleLogin}>
					<Logo src={logo} />
					<LoginInput ref={usernameRef} type="text" name="login" placeholder="login" />
					<LoginInput ref={passwordRef} type="password" name="senha" placeholder="Senha" />
					<LoginButton type="submit">Entrar</LoginButton>
				</LoginForm>
			</ContainerContent>
    </LoginContainer>

		</>
  );
}

export default Login;
