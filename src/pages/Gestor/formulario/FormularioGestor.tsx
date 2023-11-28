import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../utils/firebase/findById";
import { IGestor } from "../../../types/IGestor";
import { createDoc } from "../../../utils/firebase/createDoc";
import { updateDocById } from "../../../utils/firebase/updateDocById";
import { ButtonEnviarFormulario, ButtonUpdateSenha, ContentContainer, Formulario, InputFormulario } from "./style";
import Swal from "sweetalert2";


export function FormularioGestor(){

	const navigate = useNavigate()

	const { id } = useParams();

	const [email, setEmail] = useState<string>("");
	const [nome, setNome] = useState<string>("");
	const [login, setLogin] = useState<string>("");
	const [senha, setSenha] = useState<string>("");

	const [isCreating, setCreating] = useState<boolean>(true);

	useEffect(()=>{

		if(id){
			console.log(id);
			definirGestorExistente(id);
			setCreating(false)
		}

	},[])

	async function  definirGestorExistente(id: string){
		const { email, login, nome, senha } = await findById("gestor",id) as unknown as IGestor;
		setEmail(email);
		setNome(nome);
		setLogin(login);
		setSenha(senha);
	}

	async function criptografarSenha(senha: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(senha);

		const hashBuffer = await crypto.subtle.digest('SHA-256', data);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

		return hashHex;
	}


	async function cadastrarOuEditarGestor(event: FormEvent<HTMLFormElement>){
		event.preventDefault();

		if(!email || !nome || !login || !senha){
			window.alert("Campos obrigatorios faltando")
			return
		}

		const senhaCrypted = await criptografarSenha(senha);

		const data = {
			email,
			nome,
			login,
			senha: senhaCrypted,
		}

		if(isCreating){
			await createDoc("gestor", data)
			navigate("/gestor")
		}


		if(!id){
			return
		}
		await updateDocById("gestor", id, data);
		navigate('/gestor')
		return
	}

	async function atualizarSenha(){
		Swal.fire({
			title: "Digite sua nova senha",
			input: "password",
			inputAttributes: {
				autocapitalize: "off"
			},
			showCancelButton: true,
			confirmButtonText: "Atualizar",
			showLoaderOnConfirm: true,
			allowOutsideClick: () => !Swal.isLoading()
		}).then(async (result) => {
			if (result.isConfirmed) {
				if(result.value && result.value.length > 0) {

					const senhaCrypted = await criptografarSenha(result.value);

					const data = {
						email,
						nome,
						login,
						senha: senhaCrypted,
					}
					if(!id){
						return
					}
					await updateDocById("gestor", id, data);

					Swal.fire({
						position: "top-end",
						icon: "success",
						title: "Senha atualizado com sucesso",
						showConfirmButton: false,
						timer: 1000
					})
				}
			}
		});
	}

	return(
		<>
			<ContentContainer>
				<Formulario
					onSubmit={cadastrarOuEditarGestor}
				>
					<label>Email</label>
					<InputFormulario
						name="email"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>

					<label>Nome</label>
					<InputFormulario
						name="nome"
						type="text"
						value={nome}
						onChange={e => setNome(e.target.value)}
					/>

					<label>Login</label>
					<InputFormulario
						name="login"
						type="text"
						value={login}
						onChange={e => setLogin(e.target.value)}

					/>

					{isCreating ? (
						<>
							<label>Senha</label>
							<InputFormulario
								name="senha"
								type="text"
								value={senha}
								onChange={e => setSenha(e.target.value)}

							/>
						</>
					): (
						<>
							<br />
							<ButtonUpdateSenha
							  type="button"
								onClick={() => atualizarSenha()}
							>
								Atualizar Senha
							</ButtonUpdateSenha>
						</>
					)}

					<br />
					<br />


				<ButtonEnviarFormulario>
					{isCreating ? "Cadastrar": "Atualizar"}
				</ButtonEnviarFormulario>

				</Formulario>
			</ContentContainer>
		</>
	)
}