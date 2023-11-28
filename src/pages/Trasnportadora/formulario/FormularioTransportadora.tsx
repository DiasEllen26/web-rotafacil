import React, { FormEvent, useEffect, useState } from "react";
import { ButtonEnviarFormulario, ContainerContent, Formulario, InputFormulario } from "../../../components/Formulario/index";
import { createDoc } from "../../../utils/firebase/createDoc";
import { useNavigate, useParams } from "react-router-dom";
import { findById } from "../../../utils/firebase/findById";
import { ITrasnportadora } from "../../../types/ITrasnportadora";
import { updateDocById } from "../../../utils/firebase/updateDocById";


export function FormularioTransportadora(){

	const navigate = useNavigate()

	const { id } = useParams();

	const [email, setEmail] = useState<string>("");
	const [endereco, setEndereco] = useState<string>("");
	const [nome, setNome] = useState<string>("");
	const [sitio, setSitio] = useState<string>("");
	const [telefone, setTelefone] = useState<number>();

	const [isCreating, setCreating] = useState<boolean>(true);

	useEffect(()=>{

		if(id){
			console.log(id);
			definirTransportadoraExistente(id);
			setCreating(false)
		}
	},[])

	async function definirTransportadoraExistente(id:string){
		const transportadoraData = await findById("transportadora",id);

		const { email, endereco, nome, sitio, telefone } = transportadoraData as unknown as ITrasnportadora

		setEmail(email);
		setEndereco(endereco);
		setNome(nome);
		setSitio(sitio);
		setTelefone(telefone);
	}


	async function cadastrarOuEditarTransportadora(event: FormEvent<HTMLFormElement>){
		event.preventDefault();

		if(!email || !sitio || !telefone || !nome || !endereco){
			window.alert("Campos obrigatorios faltando.")
			return
		}

		const data = {
			email,
			endereco,
			nome,
			sitio,
			telefone: +telefone
		}

		if(isCreating){
			console.log("Criando")
			await createDoc("transportadora", data);
			navigate('/transportadora')
			return
		}

		if(!id){
			console.log("Não tem o id")
			return
		}
		await updateDocById("transportadora", id, data);
		navigate('/transportadora')
		return
	}

	return(
		<>
			<ContainerContent>
				<Formulario
					onSubmit={cadastrarOuEditarTransportadora}
				>
					<label htmlFor="email">Email</label>
					<InputFormulario
						name="email"
						type="email"
						value={email}
						onChange={ e => setEmail(e.target.value)}
					/>
					<label htmlFor="endereco">Endereço</label>
					<InputFormulario
						name="endereco"
						type="text"
						value={endereco}
						onChange={ e => setEndereco(e.target.value)}
					/>
					<label htmlFor="nome">Nome</label>
					<InputFormulario
						name="nome"
						type="text"
						value={nome}
						onChange={ e => setNome(e.target.value)}
					/>
					<label htmlFor="sitio">Sitío</label>
					<InputFormulario
						name="sitio"
						type="text"
						value={sitio}
						onChange={ e => setSitio(e.target.value)}
					/>
					<label htmlFor="telefone">Telefone</label>
					<InputFormulario
						name="telefone"
						type="tel"
						value={telefone}
						onChange={ e => setTelefone(+e.target.value)}
					/>
					<ButtonEnviarFormulario
						type="submit"
					>
					{isCreating ? "Cadastrar": "Atualizar"}
				</ButtonEnviarFormulario>
				</Formulario>
			</ContainerContent>

		</>
	)
}