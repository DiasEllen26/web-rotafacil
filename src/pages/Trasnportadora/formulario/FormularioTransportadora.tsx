import { FormEvent } from "react";
import { ButtonEnviarFormulario, ContainerContent, Formulario, InputFormulario } from "./style";
import { createDoc } from "../../../utils/firebase/createDoc";
import { useNavigate } from "react-router-dom";

export function FormularioTransportadora(){

	const navigate = useNavigate()

	async function cadastrarTransportadora(event: FormEvent<HTMLFormElement>){
		event.preventDefault();

		const target = event.target as any
		const email = target.elements.email.value;
		const endereco = target.elements.endereco.value;
		const nome = target.elements.nome.value;
		const sitio = target.elements.sitio.value;
		const telefone = target.elements.telefone.value;


		if(!email || !sitio || !telefone || !nome || !endereco){
			window.alert("Campos obrigatorios.")
		}

		const data = {
			email,
			endereco,
			nome,
			sitio,
			telefone: +telefone
		}

		await createDoc("transportadora", data);

		navigate('/transportadora')
	}

	return(
		<>
			<ContainerContent>
				<Formulario
					onSubmit={cadastrarTransportadora}
				>
					<label htmlFor="email">Email</label>
					<InputFormulario
						name="email"
						type="email"
					/>
					<label htmlFor="endereco">Endereço</label>
					<InputFormulario
						name="endereco"
						type="text"
					/>
					<label htmlFor="nome">Nome</label>
					<InputFormulario
						name="nome"
						type="text"
					/>
					<label htmlFor="sitio">Sitío</label>
					<InputFormulario
						name="sitio"
						type="text"
					/>
					<label htmlFor="telefone">Telefone</label>
					<InputFormulario
						name="telefone"
						type="tel"
					/>
					<ButtonEnviarFormulario
						type="submit"
					>
					Enviar
				</ButtonEnviarFormulario>
				</Formulario>
			</ContainerContent>

		</>
	)
}